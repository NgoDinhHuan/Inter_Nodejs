const express = require("express");
const router = express.Router();
const reset_emailcontroller = require("../controllers/reset_email.controller");


router.post('/reset', reset_emailcontroller.sendPasswordResetEmail);

module.exports = router;