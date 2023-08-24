const router = require("express").Router();
const authController = require("../controllers/auth.controller");


//REGISTER
router.post("/register", authController.register);

//LOGIN
router.post("/login", authController.login);

// send email
router.post("/send-email", authController.sendEmail);


// forgot password
router.post("/forgot-pass",authController.forgotPassword);

// reset password
router.post("/reset-pass",authController.resetPassword)


module.exports = router;