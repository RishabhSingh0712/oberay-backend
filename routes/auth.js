const express = require('express');
const AuthController = require('../controllers/auth');
const productControler = require("../controllers/productControler");

const router = express.Router();

const auth = new AuthController()

router.post('/login', auth.login )
router.post('/forgot-password', auth.forgotPassword )
router.post('/reset-password', auth.resetPassword)
router.post('/register',auth.signup)
router.delete('/delete-user/:id',auth.deteletUser)
router.get('/get-user-by-id/:id',auth.getUserById)
router.put('/profile',productControler.upload.single('image'),auth.profile)
router.post('/genrate-otp',auth.genrateOTP)
router.post('/signup-google',auth.signUpWithGoogle)
router.post('/signup-facebook',auth.signUpWithFacebook)


module.exports = router;