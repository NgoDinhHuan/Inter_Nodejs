const Cart = require("../models/cart.model");


// create
const createCart = async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
};
// Update
const updateCart = async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id, {
      $set: req.body,
    },
      { new: true }
    );
    res.status(200).json(updateCart);
  } catch (err) {
    res.status(500).json(err);
  }
};
// Delete
const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been delete");
  } catch (err) {
    res.status(500).json(err);
  }
};
// get user cart

const getUserCart = async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.params.userId });
    if (!userCart) {
      res.status(400).json("Get user cart failed");
      return;
    }
    res.status(200).json(userCart);
  } catch (err) {
    res.status(500).json(err);
  }
};
// get all cart
const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllCarts


}