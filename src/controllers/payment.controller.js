const Order = require("../models/order.model"); 
const Payment = require("../models/payment.model");
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const createPaymentSession = async (req, res) => {
    try {
        const { orderId, amount, currency } = req.body;

        // Tìm thông tin đơn hàng trong cơ sở dữ liệu
        const order = await Order.findById(orderId);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: order.products.map(product => ({
                price_data: {
                    currency: currency,
                    product_data: {
                        name: product.productId, // Sử dụng tên sản phẩm hoặc thông tin phù hợp
                    },
                    unit_amount: product.quantity * 100,
                },
                quantity: product.quantity,
            })),
            mode: 'payment',
            success_url:process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL,
        });

        const paymentInfo = {
            orderId: orderId,
            amount: amount,
            currency: currency,
            paymentStatus: 'pending',
            sessionId: session.id,
        };
        const newPayment = new Payment(paymentInfo);
        await newPayment.save();

        res.status(200).json({ sessionUrl: session.url });
    } catch (error) {
        console.error('Error creating payment session:', error);
        res.status(500).json({ message: "An error occurred" });
    }
};

module.exports = {
    createPaymentSession,
}


