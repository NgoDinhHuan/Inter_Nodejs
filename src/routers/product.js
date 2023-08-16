const router = require("express").Router();
const {
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const productController = require("../controllers/product.controller");

router.post("/", verifyTokenAndAdmin, productController.createProduct);
router.put("/:id", verifyTokenAndAdmin, productController.updateProduct);
router.delete("/:id", verifyTokenAndAdmin, productController.deleteProduct);
router.get("/find/:id", productController.getProductById);
router.get("/", productController.getAllProducts);
router.get("/search",productController.searchProducts);

module.exports = router;