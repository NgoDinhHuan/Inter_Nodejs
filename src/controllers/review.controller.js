const Review = require("../models/review.model");

const createReview = async (req, res) => {
  try {
    const { user, product, rating, comment } = req.body;
    const newReview = new Review({ user, product, rating, comment });
    const savedReview = await newReview.save();
    res.status(200).json(savedReview);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log("Product ID:", productId);
    const reviews = await Review.find({ product: productId });
    res.status(200).json(reviews);
  } catch (err) {
    console.error("Error getting product reviews:", err);
    res.status(500).json(err);
  }
};

module.exports = {
  createReview,
  getProductReviews,
};