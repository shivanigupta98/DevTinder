const express = require('express');
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const { validateSignUpData } = require('../utils/validation');


authRouter.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req);
        const { firstName, lastName, email, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, email, password: passwordHash });
        await user.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(400).send("Error adding user!" + err.message);
    }
});
authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }
        else {
            const token = await user.getJWT();
            res.cookie("token", token);
            res.send('Login Successful!!');
        }

    } catch (err) {
        res.status(400).send("Error loggin in!" + err.message);
    }
});
authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    })
    res.send("Logout successful!!");
})
module.exports = authRouter;