const { Pool } = require('pg')
require('dotenv').config();

//console.log(process.env.NODE_ENV, process.env.DATABASE_URL)
const pool = process.env.NODE_ENV === 'development' ? new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
}) : new Pool ({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

pool.on('error', (err, client) => {
    console.log('Unexpected error on idle client', err)
    process.exit(-1)
})

module.exports = {
    query: (text, params) => pool.query(text, params),
}