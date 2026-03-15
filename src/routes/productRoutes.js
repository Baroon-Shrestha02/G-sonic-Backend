import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import protect from "../middlewares/protectUser.js";

const router = express.Router();

// public routes
router.get("/products", getProducts);
router.get("/products/:id", getProductById);

// admin only
router.post("/products", protect, createProduct);
router.put("/products/:id", protect, updateProduct);
router.delete("/products/:id", protect, deleteProduct);

export default router;
