const Router = require('express-promise-router')
const router = new Router()
const db = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = router

router.post("/register", async (req, res) => {
    try {
        //console.log(req.query)
        const { first_name, last_name, email, password } = req.query

        // validate user input
        if (!(email && password && first_name && last_name)) {
            return res.status(400).send("All input is required");
        }

        // check if user already exists
        const values = []
        values.push(email) 
        const text = 'SELECT * FROM users WHERE email=$1'
        const oldUser = await db.query(text, values)
        //console.log("oldUser:", oldUser)

        if(oldUser.rowCount > 0) {
            return res.status(409).send("User Already Exists. Please Login")
        }

        // Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const text2 = 'INSERT INTO users(first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *'
        const values2 = []
        values2.push(first_name)
        values2.push(last_name)
        values2.push(email.toLowerCase())
        values2.push(encryptedPassword)        
        const user = await db.query(text2, values2)
        //console.log("user:", user)
        //console.log(user.rows)

        // Create token - need user id
        const token = jwt.sign(
            { user_id: user.rows[0].id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        )

        //console.log("generated token: ", token)
        // save user token to db
        const text3 = 'UPDATE users SET token=$1 WHERE email=$2 RETURNING *'
        const values3 = []
        values3.push(token)
        values3.push(email)
        const finalUser = await db.query(text3, values3)
        //console.log(finalUser.rows[0])

        res.status(201).json(finalUser.rows[0]);

    } catch (err) {
        console.log(err)
    }
})

router.post("/login", async (req, res) => {
    res.send({
        token: 'testing123'
    });
})