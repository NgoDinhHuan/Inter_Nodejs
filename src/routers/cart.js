const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const {
    verifyToken,
    verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

router.post("/", verifyToken, cartController.createCart);
router.put("/:id", verifyToken, cartController.updateCart);
router.delete("/:id", verifyToken, cartController.deleteCart);
router.get("/find/:userId", verifyTokenAndAdmin, cartController.getUserCart);
router.get("/", verifyTokenAndAdmin, cartController.getAllCarts);

module.exports = router;