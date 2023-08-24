const Order = require("../models/order.model");

// crete order
const createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const saveOrder = await newOrder.save();
        res.status(200).json(saveOrder);
    } catch (err) {
        res.status(500).json(err);
    }
};

// update
const updateOrder = async (req, res) => {
    try {
        const updateOrder = await Order.findByIdAndUpdate(
            req.params.id, {
            $set: req.body,
        },
            { new: true }
        );  
        res.status(200).json(updateOrder);
    } catch (err) {
        res.status(500).json(err);
    }
}
// Delete
const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been delete");
    } catch (err) {
        res.status(500).json(err);
    }
};
// get user order
const getUserOrder = async (req, res) => {
    try {
        const userOrder = await Order.findOne({ userId: req.params.userId });
        res.status(200).json(userOrder)
    } catch (err) {
        res.status(500).json(err);
    };
};
const getAllOrder = async (req, res) => {
    try {
        const carts = await Order.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getUserOrder,
    getAllOrder
}