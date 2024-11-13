const {
  createBook,
  getBookDetails,
  deleteBook,
  updateBookByCode,
} = require("../models/librarianModels");

async function handleNewBook(req, res) {
  try {
    console.log("Inside handleNewBook");
    await createBook(req.body);
    res.status(200).json({
      msg: "Book Entered",
    });
  } catch (err) {
    res.status(500).json({
      msg: "An error occured ",
      err,
    });
  }
}

async function getAllBooks(req, res) {
  try {
    const result = await getBookDetails();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      msg: "An error occured ",
      err,
    });
  }
}

async function updateBook(req, res) {
  const bookcode = req.params.bookcode;
  try {
    const result = await updateBookByCode(bookcode,req.body);
    res.status(200).json({
      msg: "Book Updated",
      data:result
    });
  } catch (err) {
    res.status(501).json({
      msg: "Some error occured",
      err,
    });
  }
}

async function removeBook(req, res) {
  try {
    const bookcode = req.params.bookcode;
    const rowsDeleted = await deleteBook(bookcode); // Await the delete function

    if (rowsDeleted > 0) {
      res.status(200).json({ msg: "Book deleted successfully" });
    } else {
      res.status(404).json({ msg: "No book found with the given bookcode" });
    }
  } catch (err) {
    res.status(500).json({
      msg: "An error occurred",
      err: err.message,
    });
  }
}

module.exports = { handleNewBook, getAllBooks, updateBook, removeBook };
