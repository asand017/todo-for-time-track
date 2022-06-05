const Router = require('express-promise-router')
const router = new Router()
const db = require('../db')

module.exports = router

router.get('/', async (req, res) => {
    //console.log("request from client:", req)
    const { rows } = await db.query('SELECT NOW()')
    console.log(rows[0])
    res.send(rows[0])
})

router.get('/fetchTodos', async (req, res) => {
    //console.log(req.query)
    const { rows } = await db.query('SELECT * FROM tasks')
    console.log(rows[0])
    res.send(rows[0])
})

router.post('/addTodo', async (req, res) => {
    console.log("create todo: ", req.query)
})
