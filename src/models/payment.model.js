const mongoose = require ('mongoose');
const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    currency:{
        type: String,
        required: true,
    },
    paymentStatus:{
        type: String,
        default:'pending',
    },
    sessionId:{
        type: String,
        required : true,
    },
    orderId:{
        type: String,
        require: true,
    },
});

module.exports = mongoose.model("Payment", paymentSchema);