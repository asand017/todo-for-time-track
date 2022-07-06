const Router = require('express-promise-router')
const router = new Router()
const db = require('../db')
const auth = require('../middleware/auth')

module.exports = router

router.get('/fetchTodos', auth, async (req, res) => {
    const { rows } = await db.query('SELECT * FROM tasks ORDER BY start_time')
    console.log("rows (fetchTodos)", rows)
    res.send(rows)
})

router.post('/addTodo', async (req, res) => {
    const text = 'INSERT INTO tasks(name, description, priority, start_time, end_time, day) VALUES ($1, $2, $3, $4, $5, $6)'
    const values = Object.keys(req.query).map((key) => req.query[key])
    const { rows } = await db.query(text, values)
    res.send(rows[0])
})

router.put('/updateTodo/:id', async (req, res) => {
    console.log("updating todo:", req.query, req.params)
    const text = 'UPDATE tasks SET name=$2, description=$3, priority=$4, start_time=$5, end_time=$6, day=$7 WHERE id=$1'
    const values = Object.keys(req.query).map((key) => req.query[key])
    console.log(values);
    const { rows } = await db.query(text, values);
    res.send(rows[0])
})

router.put('/completeTodo/:id', async (req, res) => {
    console.log("complete todos:", req.query, req.params);
    const text = 'UPDATE tasks SET complete=$2 WHERE id=$1'
    const values = Object.keys(req.query).map((key) => req.query[key])
    const { rows } = await db.query(text, values);
    res.send(rows[0])
})

router.delete('/deleteTodo/:id', async (req, res) => {
    console.log("deleting todo @id=", req.params.id)
    const text = 'DELETE FROM tasks WHERE id=$1'
    const values = [req.params.id]
    const { rows } = await db.query(text, values)
    res.send(rows[0])
})