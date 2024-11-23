const { Router } = require("express");
const router = Router();
const { handleNewAcc, handleSignIn, handleNewBook, getAllBooks, removeBook, updateBook } = require("../controllers/librarianController");
const {checkUniqueUser, generateAccessToken, verifyToken} = require("../middlewares/librarianMiddlewares")

router.post('/signup',checkUniqueUser,generateAccessToken,handleNewAcc);
router.post('/signin',generateAccessToken,handleSignIn)
router.post('/create',verifyToken,handleNewBook);
router.get('/books',verifyToken,getAllBooks);
router.put('/update/:bookcode',verifyToken,updateBook);
router.delete('/remove/:bookcode',verifyToken,removeBook);

module.exports = router;
