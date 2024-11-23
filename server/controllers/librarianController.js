const {
  createLibrarian,
  checkLibrarianAccount,
  createBook,
  getBookDetails,
  deleteBook,
  updateBookByCode,
  getBookDetailsByName,
  getBookDetailsByType,
  getBorrowedBookDetails,
} = require("../models/librarianModels");

async function handleNewAcc(req, res) {
  console.log("Inside librarian sign in")
  try {
    const result = await createLibrarian(req.body);
    res.json({
      msg: "Librarian Account Created successfully",
      data: {
        user: result,
        usertype: 1,
      },
      token: req.token,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Some error occurred!!",
      err,
    });
  }
}

async function handleSignIn(req, res) {
  const { email, password } = req.body;
  const result = await checkLibrarianAccount(req.body.email);
  try {
    if (
      result.rows[0].email === email &&
      result.rows[0].librarianpassword === password
    ) {
      res.status(200).json({
        msg: "Librarian found Signed In",
        data: {
          name: result.rows[0].name,
          email: result.rows[0].email,
          usertype: 1,
        },
        token: req.token,
      });
    } else {
      res.status(500).json({
        msg: "Invalid email or password",
      });
    }
  } catch (err) {
    res.status(501).json({
      msg: "Something unusual occured " + err.message,
    });
    throw err.message;
  }
}

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

async function getBooksByName(req, res) {
  try {
    const result = await getBookDetailsByName();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      msg: "An error occured ",
      err,
    });
  }
}

async function getBorrowedBooks(req, res) {
  try {
    const email = req.body.email;
    const result = await getBorrowedBookDetails(email);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      msg: "An error occured ",
      err,
    });
  }
}

async function getBooksByType(req, res) {
  const { booktype } = req.params;
  try {
    const result = await getBookDetailsByType(booktype);
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
    const result = await updateBookByCode(bookcode, req.body);
    res.status(200).json({
      msg: "Book Updated",
      data: result,
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

module.exports = {
  handleNewAcc,
  handleSignIn,
  handleNewBook,
  getAllBooks,
  getBooksByName,
  getBooksByType,
  getBorrowedBooks,
  updateBook,
  removeBook,
};
