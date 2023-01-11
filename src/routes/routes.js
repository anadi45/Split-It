const router = require("express").Router();

const {isLoggedIn} = require("../middlewares/auth");
const {signUp, logIn, logOut, allFriends, addFriend, names, currentUser} = require("../controllers/userController");
const {initiateTransaction, updateTransaction, deleteTransaction, allTransactions, updateBudget} = require("../controllers/transactionController");
const {payBack, pendingPayments, owe} = require("../controllers/paymentController");

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/logout", logOut);
router.get("/allFriends",isLoggedIn, allFriends);
router.post("/addFriend", isLoggedIn, addFriend);
router.post("/names", names);
router.get("/currentUser", isLoggedIn, currentUser);

router.post("/initiateTransaction", isLoggedIn, initiateTransaction);
router.patch("/updateTransaction/:transactionId", isLoggedIn, updateTransaction);
router.delete("/deleteTransaction/:transactionId", isLoggedIn, deleteTransaction);
router.get("/allTransactions", isLoggedIn, allTransactions);
router.patch("/updateBudget", isLoggedIn, updateBudget);

router.post("/payBack/:transactionId", isLoggedIn, payBack);
router.get("/pendingPayments", isLoggedIn, pendingPayments);
router.get("/owe", isLoggedIn, owe);

module.exports = { router };