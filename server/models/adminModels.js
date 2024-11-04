const { getClient } = require("../db/connectDb");

async function createAdmin({ adminname, email, password }) {
    const client = await getClient();
  try {
    const query = `INSERT INTO adminsTable(adminname,email,adminpassword) VALUES($1,$2,$3) RETURNING id`;
    const values = [adminname, email, password];
    const result = await client.query(query, values);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}



module.exports = { createAdmin };
