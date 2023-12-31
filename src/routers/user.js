const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

const {
    verifyTokenAndAdmin
} = require("../middleware/verifyToken");

router.put("/update/:id", userController.updateUser);
router.delete("/:id", verifyTokenAndAdmin, userController.deleteUser);
router.get("/find/:id", verifyTokenAndAdmin, userController.getUserById);
router.get("/listUsers", verifyTokenAndAdmin, userController.getAllUsers);


module.exports = router;