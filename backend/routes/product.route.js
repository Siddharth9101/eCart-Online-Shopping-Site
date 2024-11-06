const { Router } = require("express");
const { authMiddleware } = require("../middleware.js");
const {
  createProduct,
  deleteProduct,
  allProducts,
} = require("../controllers/product.controller.js");

const router = Router();

router.get("/bulk", allProducts);
router.post("/add", authMiddleware, createProduct);
router.delete("/delete/:id", authMiddleware, deleteProduct);

module.exports = router;
