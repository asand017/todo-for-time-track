const Router = require('express-promise-router')
const router = new Router()
const db = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = router

router.post("/register", async (req, res) => {
    try {
        console.log(req.body)
        const { first_name, last_name, email, password } = req.body

        // validate user input
        if (!(email && password && first_name && last_name)) {
            return res.status(400).send("All input is required");
        }

        // check if user already exists
        const values = []
        values.push(email) 
        const text = 'SELECT * FROM users WHERE email=$1'
        const oldUser = await db.query(text, values)

        if(oldUser) {
            return res.status(409).send("User Already Exists. Please Login")
        }

        // Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const text2 = 'INSERT INTO users(first_name, last_name, email, password) VALUES ($1, $2, $3, $4)'
        const values2 = []
        values2.push(first_name)
        values2.push(last_name)
        values2.push(email.toLowerCase())
        values2.push(encryptedPassword)        
        const user = await db.query(text2, values2)

        // Create token - need user id
        /*const token = jwt.sign(
            { user_id: user._id, email}
        )*/

        res.status(201).json(user);

    } catch (err) {
        console.log(err)
    }
})

router.post("/login", async (req, res) => {
    res.send({
        token: 'testing123'
    });
})