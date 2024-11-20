const { Router } = require("express");
const router = Router();
const { handleUserSignUp, handleSignIn, handleLoan, handleReturn } = require("../controllers/userController");
const { checkUniqueUser,generateAccessToken, verifyToken } = require("../middlewares/userMiddlewares");
const { getAllBooks, getBooksByName, getBooksByType, getBorrowedBooks } = require("../controllers/librarianController");




router.post('/signup',checkUniqueUser,generateAccessToken,handleUserSignUp);
router.post('/signin',generateAccessToken,handleSignIn);
router.get('/books',verifyToken, getAllBooks);
router.get('/booksbyname',verifyToken, getBooksByName);
router.get('/booksbytype/:booktype', verifyToken, getBooksByType);
router.post('/borrowedbooks',verifyToken, getBorrowedBooks);
router.post('/loan/:bookcode',verifyToken, handleLoan);
router.delete('/return/:bookcode',verifyToken, handleReturn);

module.exports = router;