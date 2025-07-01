// productController.js
import Product from "../models/Product.js";

/**
 * Create a new product
 */
export const createProduct = async (req, res) => {
  const { productname } = req.body;

  if (!productname) {
    return res.status(400).json({ error: "Product name is required." });
  }

  try {
    const newProduct = new Product({ productname });
    await newProduct.save();
    return res.status(200).json({ message: "Product added successfully" });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ error: "Database error" });
  }
};

/**
 * Get all products
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(404).json({ message: "No product found" });
    }
    return res.status(200).json(products);
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ error: "Database error" });
  }
};

// Update the updateProduct function
export const updateProduct = async (req, res) => {
  const productId = Number(req.params.productId);
  const { productname } = req.body;

  if (!productname) {
    return res.status(400).json({ error: "Product name is required." });
  }

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { productId }, // Changed from findByIdAndUpdate to findOneAndUpdate
      { productname },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ 
        success: false,
        message: "Product not found.",
        details: `No product found with ID: ${productId}`
      });
    }

    return res.status(200).json({ 
      success: true,
      message: "Product updated successfully",
      data: updatedProduct
    });
  } catch (err) {
    console.error("Error updating product:", err);
    return res.status(500).json({ 
      success: false,
      error: "Internal Server Error",
      details: err.message 
    });
  }
};