const { Router } = require("express");
const router = Router();
const { handleUserSignUp, handleLoan, handleReturn } = require("../controllers/userController");
const { checkUniqueUser } = require("../middlewares/userMiddlewares");
const { getAllBooks } = require("../controllers/librarianController");


router.post('/signup',checkUniqueUser,handleUserSignUp);
router.get('/books',getAllBooks);
router.post('/loan/:bookcode',handleLoan);
router.delete('/return/:bookcode',handleReturn);

module.exports = router;