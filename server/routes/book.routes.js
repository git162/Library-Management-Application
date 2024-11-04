const { Router } = require("express");
const router = Router();
const { handleNewBook, getAllBooks } = require("../controllers/bookController"); // Ensure this path is correct

router.post('/create', handleNewBook);
router.get('/books',getAllBooks);


module.exports = router;
