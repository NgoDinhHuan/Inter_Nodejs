const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const {
    verifyToken,
    verifyTokenAndAdmin
} = require("../middleware/verifyToken");

router.post("/",verifyToken,orderController.createOrder);
router.put("/:id",verifyToken,orderController.updateOrder);
router.delete("/:id",verifyToken,orderController.deleteOrder);
router.get("/find/:userId",verifyTokenAndAdmin,orderController.getUserOrder);
router.get("/",verifyTokenAndAdmin,orderController.getAllOrder);


module.exports = router;