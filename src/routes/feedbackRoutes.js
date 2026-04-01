import express from "express";
import {
  createFeedback,
  getAllFeedback,
} from "../controllers/feebackController.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/feedback:
 *   post:
 *     summary: Submit feedback (optionally with an image)
 *     tags: [Feedback]
 *     description: |
 *       Submit a feedback form entry. This endpoint supports both `application/json` (no image)
 *       and `multipart/form-data` (to include an `image` file).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/FeedbackCreateRequest"
 *         multipart/form-data:
 *           schema:
 *             $ref: "#/components/schemas/FeedbackCreateRequest"
 *     responses:
 *       201:
 *         description: Feedback created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Feedback submitted successfully"
 *                 feedback:
 *                   $ref: "#/components/schemas/Feedback"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Error creating feedback"
 *               error: "Internal server error"
 *   get:
 *     summary: Get all feedback (newest first)
 *     tags: [Feedback]
 *     description: Returns all feedback entries in reverse chronological order.
 *     responses:
 *       200:
 *         description: List of feedback (newest first)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                   example: 2
 *                 feedbacks:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Feedback"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Error fetching feedback"
 *               error: "Internal server error"
 *
 * /api/v1/send-feedback/{productId}:
 *   post:
 *     summary: Submit feedback (optionally with an image)
 *     tags: [Feedback]
 *     deprecated: true
 *     description: |
 *       Submit a feedback form entry. This endpoint supports both `application/json` (no image)
 *       and `multipart/form-data` (to include an `image` file).
 *
 *       Deprecated. Use `POST /api/v1/feedback` instead.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Currently unused path param (kept for compatibility).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/FeedbackCreateRequest"
 *         multipart/form-data:
 *           schema:
 *             $ref: "#/components/schemas/FeedbackCreateRequest"
 *     responses:
 *       201:
 *         description: Feedback created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Feedback submitted successfully"
 *                 feedback:
 *                   $ref: "#/components/schemas/Feedback"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Error creating feedback"
 *               error: "Internal server error"
 */
router.post("/feedback", createFeedback);
router.get("/feedback", getAllFeedback);

router.post("/send-feedback/:productId", createFeedback);

/**
 * @swagger
 * /api/v1/get-feedback/{productId}:
 *   get:
 *     summary: Get all feedback (newest first)
 *     tags: [Feedback]
 *     deprecated: true
 *     description: |
 *       Returns all feedback entries in reverse chronological order.
 *
 *       Deprecated. Use `GET /api/v1/feedback` instead.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Currently unused path param (kept for compatibility).
 *     responses:
 *       200:
 *         description: List of feedback (newest first)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                   example: 2
 *                 feedbacks:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Feedback"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Error fetching feedback"
 *               error: "Internal server error"
 */
router.get("/get-feedback/:productId", getAllFeedback);

export default router;
