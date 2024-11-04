const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

async function getClient() {
  try {
    console.log("Inside getClient");
    const client = await pool.connect(); // Pool provides a client
    return client;
  } catch (err) {
    console.error("Failed to get client from pool:", err);
    throw err;
  }
}

module.exports = { getClient };
