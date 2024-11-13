const { Router } = require("express");
const router = Router();
const { handleNewBook, getAllBooks,removeBook, updateBook } = require("../controllers/librarianController"); // Ensure this path is correct

router.post('/create', handleNewBook);
router.get('/books',getAllBooks);
router.put('/update/:bookcode',updateBook);
router.delete('/remove/:bookcode', removeBook);

module.exports = router;
