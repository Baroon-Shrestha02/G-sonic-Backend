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

import protect from "../middlewares/protectUser.js";

const router = express.Router();

// public routes
router.get("/categories", getCategories);
router.get("/subcategories", getSubCategories);

// admin only 
router.post("/categories", protect, createCategory);
router.put("/categories/:id", protect, updateCategory);
router.delete("/categories/:id", protect, deleteCategory);

router.post("/subcategories", protect, createSubCategory);
router.put("/subcategories/:id", protect, updateSubCategory);
router.delete("/subcategories/:id", protect, deleteSubCategory);

export default router;
