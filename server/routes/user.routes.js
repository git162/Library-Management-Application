const { Router } = require("express");
const router = Router();
const { handleUserSignUp } = require("../controllers/userController");
const { checkUniqueUser } = require("../middlewares/userMiddlewares")

router.post('/signup',checkUniqueUser,handleUserSignUp);
//router.post('/signin',userAuth.userSignin);
//router.get('/:userid',userController.getUser);

module.exports = router;