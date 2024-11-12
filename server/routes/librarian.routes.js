const { Router } = require("express");
const router = Router();
const { handleNewBook, getAllBooks,removeBook } = require("../controllers/bookController"); // Ensure this path is correct

router.post('/create', handleNewBook);
router.get('/books',getAllBooks);
router.delete('/remove/:bookcode', removeBook);

module.exports = router;
