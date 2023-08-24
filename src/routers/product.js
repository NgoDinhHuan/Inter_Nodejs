const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const productController = require("../controllers/product.controller");
const reviewController = require("../controllers/review.controller");
const upload = require("../middleware/multer.middleware");


router.post("/add-product", verifyTokenAndAdmin, upload.single("img"), productController.createProduct);

router.put("/update-product/:id", verifyTokenAndAdmin, upload.single("img"), productController.updateProduct);

router.delete("/:id", verifyTokenAndAdmin, productController.deleteProduct);

router.get("/find/:id", productController.getProductById);

router.get("/list-product", productController.getAllProducts);

router.get("/search", productController.searchProducts);

router.post("/reviews", reviewController.createReview);

router.get("/reviews/:productId", reviewController.getProductReviews);


module.exports = router;