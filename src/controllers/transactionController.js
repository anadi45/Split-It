const { Transaction } = require("../models/transaction");
const { Payment } = require("../models/payment");
const { User } = require("../models/user");

const initiateTransaction = async function (req, res) {
    try {

        let transactionId;
        const { totalAmount, spendingType, splitList, title, share } = req.body;

        const spendingsInc = await User.findByIdAndUpdate(req.rootuser._id, { $inc: { totalSpendings: totalAmount } });

        const newTransaction = new Transaction({
            initiator: req.rootuser._id,
            totalAmount: totalAmount,
            splitList: splitList,
            spendingType: spendingType,
            title: title,
            share: share
        });

        newTransaction.save(function (err, room) {
            transactionId = room._id;
            const newPayment = new Payment({
                payer: req.rootuser._id,
                amount: totalAmount,
                transaction: transactionId,
                title: title,
                spendingType: spendingType,
                recovered: 0
            });

            const initiated = newPayment.save();
            if (initiated) {
                res.status(201).send("Transaction Initiated!");
            } else {
                res.status(400).send("Transaction Failed!");
            }
        });
    } catch (error) {
        console.log(error);
    }
}

const updateTransaction = async function (req, res) {
    try {
        const { totalAmount, spendingType, splitList } = req.body;
        const { transactionId } = req.params;

        const updated = await Transaction.findByIdAndUpdate(transactionId, {
            totalAmount: totalAmount,
            spendingType: spendingType,
            splitList: splitList
        });

        if (updated) {
            res.send({
                message: "Transaction Updated!"
            });
        } else {
            res.send({
                message: "Transaction Update Failed!"
            });
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteTransaction = async function (req, res) {
    try {
        const { transactionId } = req.params;

        const deleted = await Transaction.findByIdAndDelete(transactionId);
        if (deleted) {
            res.send({
                message: "Transaction Deleted!"
            });
        } else {
            res.send({
                message: "Transaction Delete Failed!"
            });
        }
    } catch (error) {
        console.log(error);
    }
}

const updateBudget = async function (req, res) {
    try {
        const { budget } = req.body;

        const updated = await User.findByIdAndUpdate(req.rootuser._id, {
            budget: budget
        });
        if (updated) {
            res.status(200).send("Budget Updated!");
        } else {
            res.status(400).send("Budget Update Failed!");
        }
    } catch (error) {
        console.log(error);
    }
}

const allTransactions = async function (req, res) {
    try {
        const all = await Transaction.find({ initiator: req.rootuser._id });
        if (all.length > 0) {
            res.status(200).send(all);
        } else {
            res.status(400).send("No Transaction Found!");
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { initiateTransaction, updateTransaction, deleteTransaction, updateBudget, allTransactions }