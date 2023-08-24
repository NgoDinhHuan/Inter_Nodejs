const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const {verifyToken} = require("../middleware/verifyToken");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/send-email",verifyToken, authController.sendEmail);

router.post("/forgot-pass",authController.forgotPassword);

router.post("/reset-pass",authController.resetPassword)

module.exports = router;