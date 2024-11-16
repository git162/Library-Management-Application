const { Router } = require("express");
const router = Router();
const { handleUserSignUp, handleSignIn, handleLoan, handleReturn } = require("../controllers/userController");
const { checkUniqueUser } = require("../middlewares/userMiddlewares");
const { getAllBooks, getBooksByName, getBooksByType } = require("../controllers/librarianController");


router.post('/signup',checkUniqueUser,handleUserSignUp);
router.post('/signin',handleSignIn);
router.get('/books',getAllBooks);
router.get('/booksbyname',getBooksByName);
router.get('/booksbytype/:booktype',getBooksByType);
router.post('/loan/:bookcode',handleLoan);
router.delete('/return/:bookcode',handleReturn);

module.exports = router;