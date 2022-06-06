const Router = require('express-promise-router')
const router = new Router()
const db = require('../db')

module.exports = router

router.get('/', async (req, res) => {
    //console.log("request from client:", req)
    const { rows } = await db.query('SELECT NOW()')
    console.log(rows)
    res.send(rows)
})

router.get('/fetchTodos', async (req, res) => {
    //console.log(req.query)
    const { rows } = await db.query('SELECT * FROM tasks')
    console.log("fetching rows: ", rows)
    res.send(rows)
})

router.post('/addTodo', async (req, res) => {
    const text = 'INSERT INTO tasks(name, description, priority, start_time, end_time) VALUES ($1, $2, $3, $4, $5)'
    console.log("create todo: ", req.query)
    const values = Object.keys(req.query).map((key) => req.query[key])
    console.log(values)
    const { rows } = await db.query(text, values)
    res.send(rows[0])
})
