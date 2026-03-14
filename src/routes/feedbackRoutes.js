import express from "express";
import protect from "../middlewares/protectUser.js";
import { createFeedback, getProductFeedback } from "../controllers/feebackController.js";

const router = express.Router();

router.post("/send-feedback/:productId", protect, createFeedback);
router.get("/get-feedback/:productId", getProductFeedback);

export default router;
