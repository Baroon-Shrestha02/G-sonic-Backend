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

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management APIs and Actions
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               count: 2
 *               products:
 *                 - _id: "prod1"
 *                   name: "Chest Freezer 225L"
 *                   price: 43943
 *                   stock: 5
 *                   category:
 *                     name: "Chest Freezer"
 *                   subCategory:
 *                     name: "Hard Top Single Door"
 *                 - _id: "prod2"
 *                   name: "LED TV 50 inch"
 *                   price: 60000
 *                   stock: 3
 *                   category:
 *                     name: "TV"
 *                   subCategory:
 *                     name: "LED"
 */
router.get("/products", getProducts);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               product:
 *                 _id: "prod1"
 *                 name: "Chest Freezer 225L"
 *                 description: "High quality freezer"
 *                 price: 43943
 *                 discountPrice: 40000
 *                 stock: 5
 *                 category:
 *                   name: "Chest Freezer"
 *                 subCategory:
 *                   name: "Hard Top Single Door"
 *                 image: "image-url"
 *       404:
 *         description: Product not found
 */
router.get("/products/:id", getProductById);

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - stock
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               discountPrice:
 *                 type: number
 *               stock:
 *                 type: number
 *               category:
 *                 type: string
 *                 description: Category ID
 *               subCategory:
 *                 type: string
 *                 description: SubCategory ID
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Product created successfully"
 *               product:
 *                 _id: "prod1"
 *                 name: "Chest Freezer"
 *       401:
 *         description: Unauthorized
 */
router.post("/products", protect, createProduct);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               discountPrice:
 *                 type: number
 *               stock:
 *                 type: number
 *               category:
 *                 type: string
 *               subCategory:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
router.put("/products/:id", protect, updateProduct);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete("/products/:id", protect, deleteProduct);

export default router;
