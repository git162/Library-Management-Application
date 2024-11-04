const { createBook, getBookDetails } = require("../models/bookModels");

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

module.exports = { handleNewBook, getAllBooks };
