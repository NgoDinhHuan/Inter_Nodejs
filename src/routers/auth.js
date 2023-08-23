const router = require("express").Router();
const authController = require("../controllers/auth.controller");


//REGISTER
router.post("/register", authController.register);

//LOGIN
router.post('/login', authController.login);

// send email
router.post('/send-email', authController.sendEmail);

module.exports = router;