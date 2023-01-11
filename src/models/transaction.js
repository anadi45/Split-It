const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    initiator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    totalAmount: {
        type: Number,
        required: true
    },
    spendingType:{
        type: String
    },
    splitList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    paidList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    date: {
        type: Date,
        default: Date.now()
    },
    share: {
        type: Number
    },
    title: {
        type: String
    },
    recovered: {
        type: Number
    }
});

const Transaction = mongoose.model("Transaction",transactionSchema);

module.exports = {Transaction};
