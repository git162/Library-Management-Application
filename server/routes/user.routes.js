const { Router } = require("express");
const router = Router();
const { handleUserSignUp } = require("../controllers/userController")

router.post('/signup',handleUserSignUp);
//router.post('/signin',userAuth.userSignin);
//router.get('/:userid',userController.getUser);

module.exports = router;