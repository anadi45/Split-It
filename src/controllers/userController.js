const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const signUp = async function (req, res) {
    try {
        
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send("All Fields Required!");
        }

        const findUser = await User.find({ email: email });
        if (findUser.length > 1) {
            return res.status(400).send("Email Already Registered!");
        }

        bcrypt.hash(password, saltRounds, async function (err, hash) {
            if (err) {
                console.error("Password unable to be hashed");
            } else {
                const newUser = new User({
                    name: name,
                    email: email,
                    password: hash
                });

                const signedUp = await newUser.save();

                if (signedUp) {
                    req.body.email = email;
                    req.body.password = password;
                    logIn(req, res);
                } else {
                    return res.status(406).send("Sign Up Failed!");
                }
            }
        })

    } catch (error) {
        console.log(error);
    }
}

const logIn = async function (req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("All Fields Required!");
        }

        const findUser = await User.find({ email: email });
        if (findUser.length >= 1) {
            
            const match = await bcrypt.compare(password, findUser[0].password);

            if (match) {
                let token = jwt.sign({ _id: findUser[0]._id }, jwtSecret);

                return res
                    .cookie("jwtoken", token, {
                        httpOnly: true,
                        sameSite: "none",
                        secure: true,
                    })
                    .status(201).send( token );
            } else {
                return res.status(400).send("Invalid Credentials!");
            }
        } else {
            return res.status(400).send("User Not Found!");
        }
    } catch (error) {
        console.log(error);
    }
}

const logOut = function (req, res) {
    try {
        res.clearCookie("jwtoken", { path: "/" });
        return res.status(200).send("User Logged Out!");
    } catch (error) {
        console.log(error);
    }
}

const allFriends = async function (req, res) {
    try {
        const currentUser = req.rootuser._id;
        const allFriends = await User.findById(currentUser, 'friendList');
        if (allFriends) {
            res.status(200).send(allFriends);
        }
    } catch (error) {
        console.log(error);
    }
}

const addFriend = async function (req,res) {
    try {
        const currentUser = req.rootuser._id;
        const {email} = req.body;

        const findFriend = await User.find({email: email});
        if(findFriend.length < 1) {
            return res.status(400).send("User Not Found!");
        } else {
            const findUser = await User.findById(currentUser);
            if((findUser.friendList.includes(findFriend[0]._id)) === true) {
                return res.status(400).send("Friend Already Added!");
            }
            let friendList = [...findUser.friendList,findFriend[0]._id];
            findUser.friendList = friendList;
            const friendAdded = await findUser.save();
            if(friendAdded) {
                res.status(201).send(findFriend[0].name);
            } else {
                res.status(400).send("Friend Add Failed!");
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const names = async function (req,res) {
    try {
        const {emails} = req.body;
        const allNames = await User.find({_id: {$in: emails}});
        let namesFound = [];
        for (let i = 0; i < allNames.length; i++) {
            namesFound.push(allNames[i].name);
        }
        if(namesFound.length > 0) {
            return res.status(200).send(namesFound);
        } 
        res.status(400).send("No Friend Added!");
    } catch (error) {
        console.log(error);
    }
}

const currentUser = async function (req,res) {
    try {
        const user = await User.findById(req.rootuser._id);
        if(user) {
            res.status(200).send(user);
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { signUp, logIn, logOut, allFriends, addFriend, names, currentUser}