const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");
const { verifyToken } = require("../middleware/verifyToken");



router.post("/create-payment/", verifyToken, paymentController.createPaymentSession);

module.exports = router;
