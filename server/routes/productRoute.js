import express from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/Productform", createProduct);
router.get("/Productform", getAllProducts);
router.put("/Productform/:id", updateProduct);

export default router;
