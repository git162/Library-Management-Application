const { getClient } = require('../db/connectDb');

async function createBook({ bookName, bookCode, author, rackNo }) {
    const client = await getClient();
    try {
        console.log("Inside createBook");
        console.log("Data being inserted:", { bookName, bookCode, author, rackNo });
        
        const query = `INSERT INTO booksTable(bookName, bookCode, author, rackNo) VALUES($1, $2, $3, $4) RETURNING id`;
        const values = [bookName, bookCode, author, rackNo];
        
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


async function getBookDetails(){
    const client = await getClient();
    try{
        const query = `SELECT * from booksTable`;
        const results = await client.query(query);
        return  results.rows;
        
    }catch(err){
        throw err;
    }finally{
        client.release();
    }
}

module.exports = { createBook, getBookDetails };
