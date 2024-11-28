const { getClient } = require("../db/connectDb");
const  { format }= require('date-fns');

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

async function getUserFine(email){
  const client = await getClient();
  try {
    const query = `SELECT totalfine FROM usersTable WHERE email = $1`;
    const result = await client.query(query, [email]);
    return result.rows[0];
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

    const currentDate = format(new Date(), 'yyyy-MM-dd');
    console.log(currentDate);

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

async function deleteLoan(bookCode, email) {
  const client = await getClient();
  try {
    await client.query('BEGIN'); 

    
    const findBookQuery = `SELECT id FROM booksTable WHERE bookCode = $1`;
    const bookResult = await client.query(findBookQuery, [bookCode]);

    if (bookResult.rows.length === 0) {
      throw new Error("Book not found");
    }
    const bookId = bookResult.rows[0].id;

    
    const findLoanQuery = `
      SELECT
        l.returnDate,
        CASE
          WHEN CURRENT_DATE > l.returnDate THEN (CURRENT_DATE - l.returnDate) * 5
          ELSE 0
        END AS fine,
        l.userId
      FROM Loans l
      WHERE l.bookId = $1
    `;
    const loanResult = await client.query(findLoanQuery, [bookId]);

    if (loanResult.rows.length === 0) {
      throw new Error("Loan record not found");
    }

    const { fine, userId } = loanResult.rows[0];

    
    const updateFineQuery = `
      UPDATE usersTable
      SET totalFine = totalFine + $1
      WHERE email = $2
    `;
    await client.query(updateFineQuery, [fine, email]);

 
    const deleteQuery = `DELETE FROM Loans WHERE bookId = $1 RETURNING *`;
    const deleteResult = await client.query(deleteQuery, [bookId]);

  
    const updateAvailability = `UPDATE booksTable SET status = 'available' WHERE id = $1`;
    await client.query(updateAvailability, [bookId]);

    await client.query('COMMIT'); 

    return { loan: deleteResult.rows[0], fine };
  } catch (err) {
    await client.query('ROLLBACK'); 
    console.error("Error in deleteLoan:", err);
    throw err;
  } finally {
    client.release();
  }
}


module.exports = { createUser, checkUser,findUserByEmail, createLoan, deleteLoan, getUserFine };
