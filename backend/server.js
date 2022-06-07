const express = require('express')
const mountRoutes = require('./routes')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3001

app.use(bodyParser.json())

app.use(cors({
    origin: "*"//['http://localhost:3000', '192.168.1.4']
}))


mountRoutes(app)

app.listen(port, () => {
    console.log('server running on port', port)
})