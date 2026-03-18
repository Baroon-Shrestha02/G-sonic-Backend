import Feedback from "../models/feedbackModel.js";

// CREATE FEEDBACK
export const createFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { productId } = req.params;

    // 🎲 Generate anonymous name: GS-XXXX (4 random digits)
    const anonymousName = `GS-${Math.floor(1000 + Math.random() * 9000)}`;

    const feedback = await Feedback.create({
      name: anonymousName,
      product: productId,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Feedback created successfully",
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating feedback",
      error: error.message,
    });
  }
};
// GET FEEDBACK FOR A PRODUCT
export const getProductFeedback = async (req, res) => {
  try {
    const { productId } = req.params;

    const feedbacks = await Feedback.find({ product: productId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      total: feedbacks.length,
      feedbacks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching feedback",
      error: error.message,
    });
  }
};
