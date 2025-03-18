const { Pool } = require('pg')

const pool = new Pool({
  user: 'user',
  host: 'db',
  database: 'mydatabase',
  password: 'password',
  port: 5432
})

const query = async (text, params) => {
  const client = await pool.connect()
  try {
    const res = await client.query(text, params)
    return res.rows
  } finally {
    client.release()
  }
}

module.exports = { query }
