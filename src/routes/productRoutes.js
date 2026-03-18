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
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category name
 *       - in: query
 *         name: subCategory
 *         schema:
 *           type: string
 *         description: Filter by subCategory name
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by product name
 *     responses:
 *       200:
 *         description: Products grouped by category
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               count: 2
 *               data:
 *                 - category_id: "cat1"
 *                   category_name: "Mobile"
 *                   products:
 *                     - id: "prod1"
 *                       name: "OnePlus 12"
 *                       price: 80000
 *                       subCategory: "OnePlus"
 *                       image:
 *                         - public_id: "products/abc123"
 *                           url: "https://res.cloudinary.com/sample.jpg"
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
 *                 name: "OnePlus 12"
 *                 description: "Latest flagship phone"
 *                 price: 80000
 *                 discountPrice: 75000
 *                 stock: 10
 *                 category:
 *                   name: "Mobile"
 *                 subCategory:
 *                   name: "OnePlus"
 *                 image:
 *                   - public_id: "products/abc123"
 *                     url: "https://res.cloudinary.com/sample.jpg"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               status: "error"
 *               message: "Product not found"
 */
router.get("/products/:id", getProductById);

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product (Admin only)
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
 *                 example: "OnePlus 12"
 *               description:
 *                 type: string
 *                 example: "Latest flagship phone"
 *               price:
 *                 type: number
 *                 example: 80000
 *               discountPrice:
 *                 type: number
 *                 example: 75000
 *               stock:
 *                 type: number
 *                 example: 10
 *               category:
 *                 type: string
 *                 example: "Mobile"
 *               subCategory:
 *                 type: string
 *                 example: "OnePlus"
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
 *                 name: "OnePlus 12"
 *                 price: 80000
 *                 stock: 10
 *                 category: "cat1"
 *                 subCategory: "sub1"
 *                 image:
 *                   - public_id: "products/abc123"
 *                     url: "https://res.cloudinary.com/sample.jpg"
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *         content:
 *           application/json:
 *             example:
 *               status: "error"
 *               message: "You are not logged in"
 */
router.post("/products", protect, createProduct);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   patch:
 *     summary: Update a product (Admin only)
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
 *                 example: "OnePlus 12 Pro"
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               price:
 *                 type: number
 *                 example: 85000
 *               discountPrice:
 *                 type: number
 *                 example: 80000
 *               stock:
 *                 type: number
 *                 example: 15
 *               category:
 *                 type: string
 *                 example: "Mobile"
 *               subCategory:
 *                 type: string
 *                 example: "OnePlus"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Product updated successfully"
 *               product:
 *                 _id: "prod1"
 *                 name: "OnePlus 12 Pro"
 *                 price: 85000
 *                 stock: 15
 *                 category:
 *                   name: "Mobile"
 *                 subCategory:
 *                   name: "OnePlus"
 *                 image:
 *                   - public_id: "products/abc123"
 *                     url: "https://res.cloudinary.com/sample.jpg"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               status: "error"
 *               message: "Product not found"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               status: "error"
 *               message: "You are not logged in"
 */
router.patch("/products/:id", protect, updateProduct);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete a product (Admin only)
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
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Product deleted successfully"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               status: "error"
 *               message: "Product not found"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               status: "error"
 *               message: "You are not logged in"
 */
router.delete("/products/:id", protect, deleteProduct);

export default router;
