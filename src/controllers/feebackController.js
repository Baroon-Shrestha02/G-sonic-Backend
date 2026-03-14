import Feedback from "../models/feedbackModel.js";

// CREATE FEEDBACK
export const createFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { productId } = req.params;

    const userId = req.user.id; // assuming user comes from auth middleware

    // check if feedback already exists
    const existingFeedback = await Feedback.findOne({
      user: userId,
      product: productId,
    });

    if (existingFeedback) {
      return res.status(400).json({
        message: "You already reviewed this product",
      });
    }

    const feedback = await Feedback.create({
      user: userId,
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

    const feedbacks = await Feedback.find({ product: productId })
      .populate("user", "firstname email")
      .sort({ createdAt: -1 });

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