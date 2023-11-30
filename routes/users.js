const Router = require("express-promise-router");
const router = new Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = router;

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.query;

    // validate user input
    if (!(email && password && first_name && last_name)) {
      return res.status(400).send("All input is required");
    }

    // check if user already exists
    const values = new Array(email);
    const text = "SELECT * FROM users WHERE email=$1";
    const oldUser = await db.query(text, values);

    if (oldUser.rowCount > 0) {
      return res.status(409).send("User Already Exists. Please Login");
    }

    // Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const text2 =
      "INSERT INTO users(first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *";
    const values2 = new Array(
      first_name,
      last_name,
      email.toLowerCase(),
      encryptedPassword
    );
    const user = await db.query(text2, values2);

    // Create token - need user id
    const token = jwt.sign(
      { user_id: user.rows[0].id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    // save user token to db
    const text3 = "UPDATE users SET token=$1 WHERE email=$2 RETURNING *";
    const values3 = new Array(token, email.toLowerCase());
    const finalUser = await db.query(text3, values3);

    res.status(201).json(finalUser.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  console.log("logging in: ", req.query);
  // begin login logic
  try {
    // get user input
    const { email, password } = req.query;

    // validate
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    // validate user exists in db
    const values = new Array(email.toLowerCase());
    const text = "SELECT * FROM users WHERE email=$1";
    const user = await db.query(text, values);

    if (user.rows && (await bcrypt.compare(password, user.rows[0].password))) {
      // create new login token
      const token = jwt.sign(
        { user_id: user.rows[0].id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      const text2 = "UPDATE users SET token=$1 WHERE email=$2 RETURNING *";
      const values2 = new Array(token, email.toLowerCase());
      const user2 = await db.query(text2, values2);

      return res.status(200).json(user2.rows[0]);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});
