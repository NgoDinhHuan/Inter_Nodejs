const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const {
    verifyToken,
    verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

router.post("/add-cart", verifyToken, cartController.createCart);

router.put("/update-cart/:id", verifyToken, cartController.updateCart);

router.delete("/:id", verifyToken, cartController.deleteCart);

router.get("/find/:userId", verifyTokenAndAdmin, cartController.getUserCart);

router.get("/list-cart", verifyTokenAndAdmin, cartController.getAllCarts);

module.exports = router;