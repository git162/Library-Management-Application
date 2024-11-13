const { createUser, createLoan, deleteLoan } = require("../models/userModels");
const userAuth = require("../auth/userAuth");

async function handleUserSignUp(req, res) {
  try {
    const result = await createUser(req.body);
    res.status(200).json({
      msg: "User Created Successfully",
      user: result,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Some error occurred!!",
      err,
    });
  }
}

async function handleLoan(req, res) {
  const bookcode = req.params.bookcode;
  const email = req.query.email;

  try {
    const loanResult = await createLoan(bookcode, email);

    res.status(200).json({
      msg: "Book loan created successfully",
      loanId: loanResult.id,
    });
  } catch (err) {
    console.error("Error in handleLoan:", err);
    res.status(501).json({
      msg: "Cannot Borrow book",
      error: err.message,
    });
  }
}

async function handleReturn(req, res) {
  const bookCode = req.params.bookcode;
  try {
    const result = await deleteLoan(bookCode);

    res.status(200).json({
      msg: "Book returned successfully",
      data: result,
    });
  } catch (err) {
    console.error("Error in handleReturn:", err);

    res.status(501).json({
      msg: "Cannot return the book",
      error: err.message || err,
    });
  }
}

module.exports = { handleUserSignUp, handleLoan, handleReturn };
