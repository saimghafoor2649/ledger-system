import express from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Use consistent route naming
router.post("/", createProduct);
router.get("/", getAllProducts);
router.put("/:productId", updateProduct);

export default router;
