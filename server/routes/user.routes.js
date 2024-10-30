const { Router } = require("express");
const router = Router();
const userAuth = require("../auth/userAuth");
const userController = require("../controllers/")

router.post('/signup',userAuth.userSignup,userController.createUser);
router.post('/signin',userAuth.userSignin);
router.get('/:userid',userController.getUser);
router.delete('/delete',userController.deleteUser);
