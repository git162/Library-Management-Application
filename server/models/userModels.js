const { getClient } = require("../db/connectDb");

async function createUser({ username, email, password }) {
  const client = await getClient();
  try {
    const query = `INSERT INTO usersTable(username,email,userpassword) VALUES($1,$2,$3) RETURNING id`;
    const values = [username, email, password];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}

async function checkUser({email,password}){
  const client = await getClient();
  try{
    const query = `SELECT username,email,userpassword FROM usersTable where email = $1`;
    const result = await client.query(query,[email]);
    return result;
  }catch(err){
    throw err;
  }finally{
    client.release();
  }
}

async function findUserByEmail(email) {
  const client = await getClient();
  try {
    const query = `SELECT * FROM usersTable WHERE email = $1`;
    const result = await client.query(query, [email]);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}

async function createLoan(bookCode, email) {
  const client = await getClient();
  try {
    const userQuery = `SELECT id FROM usersTable WHERE email = $1`;
    const userResult = await client.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      throw new Error("User not found");
    }
    const userId = userResult.rows[0].id;

    const bookQuery = `SELECT id, status FROM booksTable WHERE bookCode = $1`;
    const bookResult = await client.query(bookQuery, [bookCode]);

    if (bookResult.rows.length === 0) {
      throw new Error("Book not found");
    }

    if (bookResult.rows[0].status === "unavailable") {
      throw new Error("Book not available to issue");
    }
    const bookId = bookResult.rows[0].id;

    const currentDate = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata', 
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
  }).format(new Date());

    const loanQuery = `INSERT INTO Loans (userId, bookId, borrowDate) VALUES ($1, $2, $3) RETURNING id`;
    const loanValues = [userId, bookId, currentDate];
    const loanResult = await client.query(loanQuery, loanValues);

    const updateAvailability = `UPDATE booksTable SET status = 'unavailable' WHERE id = $1`;
    await client.query(updateAvailability, [bookId]);

    return loanResult.rows[0];
  } catch (err) {
    console.error("Error in createLoan:", err);
    throw err;
  } finally {
    client.release();
  }
}

async function deleteLoan(bookCode) {
  const client = await getClient();
  try {
    const findBookQuery = `SELECT id FROM booksTable WHERE bookCode = $1`;
    const bookResult = await client.query(findBookQuery, [bookCode]);

    if (bookResult.rows.length === 0) {
      throw new Error("Book not found");
    }

    const bookId = bookResult.rows[0].id;

    const deleteQuery = `DELETE FROM Loans WHERE bookId = $1 RETURNING *`;
    const deleteResult = await client.query(deleteQuery, [bookId]);

    if (deleteResult.rows.length === 0) {
      throw new Error("Loan record not found");
    }

    const updateAvailability = `UPDATE booksTable SET status = 'available' WHERE id = $1`;
    await client.query(updateAvailability, [bookId]);

    return deleteResult.rows[0];
  } catch (err) {
    console.error("Error in deleteLoan:", err);
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { createUser, checkUser,findUserByEmail, createLoan, deleteLoan };
