const express = require("express");
const router = express.Router();
const {
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const productController = require("../controllers/product.controller");
const reviewController = require("../controllers/review.controller");

router.post("/", verifyTokenAndAdmin, productController.createProduct);
router.put("/:id", verifyTokenAndAdmin, productController.updateProduct);
router.delete("/:id", verifyTokenAndAdmin, productController.deleteProduct);
router.get("/find/:id", productController.getProductById);
router.get("/", productController.getAllProducts);
router.get("/search",productController.searchProducts);
router.post("/reviews",reviewController.createReview);
router.get("/reviews/:productId",reviewController.getProductReviews);


module.exports = router;