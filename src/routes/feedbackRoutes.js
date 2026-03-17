import express from "express";
import protect from "../middlewares/protectUser.js";
import {
  createFeedback,
  getProductFeedback,
} from "../controllers/feebackController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: Product feedback and reviews APIs
 */

/**
 * @swagger
 * /api/v1/send-feedback/{productId}:
 *   post:
 *     summary: Create feedback for a product
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             rating: 5
 *             comment: "Excellent product, highly recommended!"
 *     responses:
 *       201:
 *         description: Feedback created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Feedback created successfully"
 *               feedback:
 *                 _id: "feedbackId"
 *                 user: "userId"
 *                 product: "productId"
 *                 rating: 5
 *                 comment: "Excellent product"
 *       400:
 *         description: User already reviewed this product
 *       401:
 *         description: Unauthorized (JWT required)
 *       500:
 *         description: Server error
 */
router.post("/send-feedback/:productId", protect, createFeedback);

/**
 * @swagger
 * /api/v1/get-feedback/{productId}:
 *   get:
 *     summary: Get all feedback for a product
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: List of feedbacks for the product
 *         content:
 *           application/json:
 *             example:
 *               total: 2
 *               feedbacks:
 *                 - _id: "feedback1"
 *                   rating: 5
 *                   comment: "Excellent product!"
 *                   user:
 *                     firstname: "Baroon"
 *                     email: "baroon@example.com"
 *                 - _id: "feedback2"
 *                   rating: 3
 *                   comment: "Average quality"
 *                   user:
 *                     firstname: "John"
 *                     email: "john@example.com"
 *       500:
 *         description: Server error
 */
router.get("/get-feedback/:productId", getProductFeedback);

export default router;
