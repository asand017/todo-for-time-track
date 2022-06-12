require('dotenv').config();
const express = require('express')
const mountRoutes = require('./routes')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const app = express()
const port = 3001

app.use(bodyParser.json())

app.use(cors({
    origin: "*"//['http://localhost:3000', '192.168.1.4']
}))

mountRoutes(app)

app.use('/', express.static(path.resolve(__dirname, "./todo-time/build")))

if (process.env.NODE_ENV === 'development') {
    app.listen(port, () => {
        console.log('server running on port:', port)
    })
}

if (process.env.NODE_ENV === 'production') {
    app.listen(process.env.PORT)
}