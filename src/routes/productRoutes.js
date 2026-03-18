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
 *     summary: Get all products grouped by category
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category name (case-insensitive)
 *         example: Mobile
 *       - in: query
 *         name: subCategory
 *         schema:
 *           type: string
 *         description: Filter by subCategory name (partial match)
 *         example: Apple
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by product name (partial match)
 *         example: Iphone
 *     responses:
 *       200:
 *         description: Products grouped by category
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               count: 2
 *               data:
 *                 - category_id: "69ba43a5efb3b9f635a73425"
 *                   category_name: "Mobile"
 *                   products:
 *                     - id: "69ba49229af74acdf1d758ab"
 *                       name: "OnePlus 12"
 *                       price: 100000
 *                       discountPrice: 90000
 *                       stock: 15
 *                       description: "Flagship killer smartphone"
 *                       subCategory: "One Plus"
 *                       image:
 *                         - public_id: "zj93gofi7dsmgd0h7kwq"
 *                           url: "https://res.cloudinary.com/sample/image.png"
 *                           _id: "69ba49229af74acdf1d758ac"
 *                     - id: "69ba91844e812a0c48ada750"
 *                       name: "Iphone 17 Pro Max"
 *                       price: 200000
 *                       discountPrice: null
 *                       stock: 10
 *                       description: "Latest Apple flagship"
 *                       subCategory: "Apple"
 *                       image:
 *                         - public_id: "ooc4dadnnsurssudubk0"
 *                           url: "https://res.cloudinary.com/sample/image.webp"
 *                           _id: "69ba91c44e812a0c48ada75a"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               status: "error"
 *               message: "Internal server error"
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
