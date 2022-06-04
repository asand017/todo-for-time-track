const Router = require('express-promise-router')
const router = new Router()
const db = require('../db')

module.exports = router

router.get('/', async (req, res) => {
    const { rows } = await db.query('SELECT NOW()')
    console.log(rows[0])
    res.send(rows[0])
})

