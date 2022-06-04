const express = require('express')
const mountRoutes = require('./routes')
const cors = require('cors')
const app = express()
const port = 3001

app.use(cors())

mountRoutes(app)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log('test connection')
})