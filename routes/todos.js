const Router = require('express-promise-router')
const router = new Router()
const db = require('../db')

module.exports = router

router.get('/fetchTodos', async (req, res) => {
    //console.log(req.query)
    const { rows } = await db.query('SELECT * FROM tasks')
    //console.log("fetching rows: ", rows)
    res.send(rows)
})

router.post('/addTodo', async (req, res) => {
    const text = 'INSERT INTO tasks(name, description, priority, start_time, end_time, day) VALUES ($1, $2, $3, $4, $5, $6)'
    //console.log("create todo: ", req.query)
    const values = Object.keys(req.query).map((key) => req.query[key])
    //console.log(values)
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

router.delete('/deleteTodo/:id', async (req, res) => {
    console.log("deleting todo @id=", req.params.id)
    const text = 'DELETE FROM tasks WHERE id=$1'
    const values = [req.params.id]
    const { rows } = await db.query(text, values)
    res.send(rows[0])
})


