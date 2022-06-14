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
    connectionString: process.env.DATABASE_URL,//"postgres://fglveyxtdxllvj:956654dd6a1962ae52e0db374f383f1fdd67a8413cf1c3964a0cb2e1604eff97@ec2-52-204-195-41.compute-1.amazonaws.com:5432/df6lru8d1qp9qm",
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