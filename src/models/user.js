const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    friendList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    budget: {
        type: Number,
        default: 0
    },
    totalSpendings: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model("User",userSchema);

module.exports = {User};
