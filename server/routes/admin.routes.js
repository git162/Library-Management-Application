const { Router } = require("express");
const { handleAdminSignUp } = require("../controllers/adminController");
const router = Router();

router.post('/signup',handleAdminSignUp);

module.exports = router;


