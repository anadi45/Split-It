const {Payment} = require("../models/payment");
const {Transaction} = require("../models/transaction");
const {User} = require("../models/user");

const pendingPayments = async function(req,res) {
    try {
        const allTransactions = await Transaction.find({splitList: req.rootuser._id, paidList: {$ne: req.rootuser._id}});
        if(allTransactions) {
            res.status(200).send(allTransactions);
        } else {
            res.status(400).send("No Pending Payment!");
        }
    } catch (error) {
        console.log(error);
    }
}

const payBack = async function (req,res) {
    try {
        const {amount} = req.body;
        const {transactionId} = req.params;
        
        const newPayment = new Payment({
            amount: amount,
            payer: req.rootuser._id,
            transaction: transactionId
        });
        const paid = await newPayment.save();

        const findTransaction = await Transaction.findById(transactionId);        
        const findInitiator = await User.findById(findTransaction.initiator)
        
        const recovery = await Transaction.findByIdAndUpdate(transactionId, {$inc: {recovered: amount}});
        const spendingsDec = await User.findByIdAndUpdate(findInitiator._id,{$inc: {totalSpendings: -amount}});
        const paidList = await Transaction.findByIdAndUpdate(transactionId,{$push: {paidList: req.rootuser._id}});

        if(spendingsDec) {
            res.send({
                message: "Payment Successful!"
            });
        } else {
            res.send({
                message: "Payment Failed!"
            });
        }
    } catch (error) {
        console.log(error);
    }
}

const owe = async function (req,res) {
    try {
        const allOY = await Transaction.find({initiator: req.rootuser._id});
        let owesYou = 0, youOwe = 0;
        for(let i=0;i<allOY.length;i++) {
            owesYou += ((allOY[i].splitList.length - allOY[i].paidList.length) * (allOY[i].totalAmount - allOY[i].share));
        }
        const allYO = await Transaction.find({splitList: req.rootuser._id, paidList: {$ne: req.rootuser._id}});
        for(let i=0 ;i<allYO.length; i++) {
            youOwe += (allOY[i].totalAmount - allOY[i].share);
        }
        res.status(200).send({owesYou,youOwe});
    } catch (error) {
        console.lof(error);
    }
}

module.exports = {payBack, pendingPayments, owe}