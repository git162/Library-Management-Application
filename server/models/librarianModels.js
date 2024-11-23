const { getClient } = require("../db/connectDb");


async function createLibrarian({ username, email, password }) {
  const client = await getClient();
try {
  const query = `INSERT INTO librarians(name,email,librarianpassword) VALUES($1,$2,$3) RETURNING id`;
  const values = [username, email, password];
  const result = await client.query(query, values);
  return result.rows;
} catch (err) {
  throw err;
} finally {
  client.release();
}
}

async function checkLibrarianAccount(email){
  const client = await getClient();
  try{
    const query = `SELECT name,email,librarianpassword FROM librarians where email = $1`;
    const result = await client.query(query,[email]);
    return result;
  }catch(err){
    throw err;
  }finally{
    client.release();
  }
}

async function createBook({
  bookName,
  bookCode,
  author,
  rackNo,
  photoLink,
  bookType,
  isbn,
  bookCategory,
}) {
  const client = await getClient();
  try {
    console.log("Inside createBook");
    console.log("Data being inserted:", {
      bookName,
      bookCode,
      author,
      rackNo,
      photoLink,
      bookType,
      isbn,
      bookCategory,
    });

    const query = `INSERT INTO booksTable(bookName, bookCode, author, rackNo, photolink, bookType, isbn, bookcategory) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;
    const values = [
      bookName,
      bookCode,
      author,
      rackNo,
      photoLink,
      bookType,
      isbn,
      bookCategory,
    ];

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

async function getBookDetailsByName() {
  const client = await getClient();
  try {
    const query = `SELECT id, bookname, author, photolink, isbn, status,booktype, bookcategory
FROM (
    SELECT id, bookname, author, photolink, isbn, status,booktype, bookcategory,
           ROW_NUMBER() OVER (PARTITION BY bookname ORDER BY id) AS row_num
    FROM bookstable
) AS ranked
WHERE row_num = 1;`;
    const results = await client.query(query);
    return results.rows;
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}

async function getBookDetailsByType(type) {
  const client = await getClient();
  try {
    const query = `SELECT * from booksTable WHERE booktype = $1`;
    const results = await client.query(query, [type]);
    return results.rows;
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}

async function getBorrowedBookDetails(email) {
  const client = await getClient();
  try {
    const query = `
            SELECT
                b.id AS bookid,
                b.bookName,
                b.isbn,
                b.photolink,
                b.bookCode,
                b.bookcategory,
                b.author,
                b.rackNo,
                l.borrowDate
            FROM
                booksTable b
            JOIN
                Loans l ON b.id = l.bookId
            JOIN
                usersTable u ON l.userId = u.id
            WHERE
                u.email = $1;
        `;
    const result = await client.query(query, [email]);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}


async function updateBookByCode(
  bookCode,
  { bookName, author, rackNo, photolink, bookType, isbn }
) {
  const client = await getClient();
  const query = `
        UPDATE booksTable
        SET 
            bookname = $1,
            author = $2,
            rackno = $3,
            photolink = $4,
            booktype = $6,
            isbn = $7
        WHERE bookcode = $5
        RETURNING *;
    `;

  const values = [
    bookName,
    author,
    rackNo,
    photolink,
    bookCode,
    bookType,
    isbn,
  ];

  try {
    const res = await client.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error("Error updating book:", err);
    throw err;
  } finally {
    client.release();
  }
}

async function deleteBook(bookcode) {
  const client = await getClient();
  const query = `DELETE FROM booksTable WHERE bookCode = $1`;
  try {
    const res = await client.query(query, [bookcode]);
    return res.rowCount;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  createLibrarian,
  checkLibrarianAccount,
  createBook,
  getBookDetails,
  getBookDetailsByName,
  getBookDetailsByType,
  getBorrowedBookDetails,
  updateBookByCode,
  deleteBook,
};
