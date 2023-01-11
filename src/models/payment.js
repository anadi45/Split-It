const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    },
    payer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amount:{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Payment = mongoose.model("Payment",paymentSchema);

module.exports = {Payment};
