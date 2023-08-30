const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/verifyToken");

//REGISTER
// router.get("/register", (req, res) => {
//     res.render("register");
// });

router.post("/register", authController.register);

//LOGIN

// router.get("/login", (req, res) => {
//     const registrationSuccess = req.query.registrationSuccess === "true";
//     res.render("login", { registrationSuccess });
// });
router.post("/login", authController.login);

// send email
router.post("/send-email", authController.sendEmail);


// forgot password
router.post("/forgot-pass", authController.forgotPassword);

// reset password
router.post("/reset-pass", authController.resetPassword);

// home
router.get("/home", verifyToken, (req, res) => {
    const user = req.user;
    res.render("home", { user });
});

module.exports = router;