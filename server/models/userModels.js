const { getClient } = require("../db/connectDb");

async function createUser({ username, email, password }) {
    const client = await getClient();
  try {
    const query = `INSERT INTO usersTable(username,email,userpassword) VALUES($1,$2,$3) RETURNING id`;
    const values = [username, email, password];
    const result = await client.query(query, values);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}

async function findUserByEmail(email){
    const client = await getClient();
    try{
        const query = `SELECT * FROM usersTable WHERE email = $1`;
        const result = await client.query(query,[email]);
        return result.rows;
    }catch(err){
        throw err
    }finally{
        client.release();
    }

}

module.exports = { createUser, findUserByEmail };
