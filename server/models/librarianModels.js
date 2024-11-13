const { getClient } = require("../db/connectDb");

async function createBook({ bookName, bookCode, author, rackNo, photolink }) {
  const client = await getClient();
  try {
    console.log("Inside createBook");
    console.log("Data being inserted:", {
      bookName,
      bookCode,
      author,
      rackNo,
      photolink,
    });

    const query = `INSERT INTO booksTable(bookName, bookCode, author, rackNo, photolink) VALUES($1, $2, $3, $4, $5) RETURNING id`;
    const values = [bookName, bookCode, author, rackNo, photolink];

    const result = await client.query(query, values);

    console.log("Book Entered:", result.rows[0].id);
    return result.rows[0].id;
  } catch (err) {
    console.error("Error creating book:", err.message);
    throw err;
  } finally {
    client.release();
  }
}

async function getBookDetails() {
  const client = await getClient();
  try {
    const query = `SELECT * from booksTable`;
    const results = await client.query(query);
    return results.rows;
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}

async function updateBookByCode(
  bookCode,
  { bookName, author, rackNo, photolink }
) {
  const client = await getClient();
  const query = `
        UPDATE booksTable
        SET 
            bookname = $1,
            author = $2,
            rackno = $3,
            photolink = $4
        WHERE bookcode = $5
        RETURNING *;
    `;

  const values = [bookName, author, rackNo, photolink, bookCode];

  try {
    const res = await client.query(query, values);
    return res.rows[0]; // Returns the updated row
  } catch (err) {
    console.error("Error updating book:", err);
    throw err;
  } finally {
    client.release();
  }
}

// models/bookModels.js
async function deleteBook(bookcode) {
  const client = await getClient();
  const query = `DELETE FROM booksTable WHERE bookCode = $1`; // Corrected table name
  try {
    const res = await client.query(query, [bookcode]);
    return res.rowCount; // Return row count to check if deletion was successful
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error; // Rethrow the error to handle it in removeBook
  } finally {
    client.release();
  }
}

module.exports = { createBook, getBookDetails, updateBookByCode, deleteBook };
