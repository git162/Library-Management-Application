const { Router } = require("express");
const { handleAdminSignUp } = require("../controllers/adminController");
const { handleNewBook, getAllBooks,removeBook } = require("../controllers/librarianController");

const router = Router();

router.post('/signup',handleAdminSignUp);
router.post('/create', handleNewBook);
router.get('/books',getAllBooks);
router.delete('/remove/:bookcode', removeBook);

module.exports = router;


