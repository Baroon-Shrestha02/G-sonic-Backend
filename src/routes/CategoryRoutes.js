import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  createSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
} from "../controllers/CategoryController.js";

const router = express.Router();

// Category
router.post("/categories", createCategory);
router.get("/categories", getCategories);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

// SubCategory
router.post("/subcategories", createSubCategory);
router.get("/subcategories", getSubCategories);
router.put("/subcategories/:id", updateSubCategory);
router.delete("/subcategories/:id", deleteSubCategory);

export default router;
