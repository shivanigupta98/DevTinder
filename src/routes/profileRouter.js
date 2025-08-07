const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const { validateEditData } = require('../utils/validation');
const bcrypt = require('bcrypt');
const { validateEditPassword } = require("../utils/validation");


profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    }
    catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        const isEditAllowed = validateEditData(req);
        if (!isEditAllowed) {
            throw new Error("Edit not allowed");
        }
        const loggedInuser = req.user;
        Object.keys(req.body).every((key) => loggedInuser[key] = req.body[key]);
        await loggedInuser.save();
        res.json({ message: "Update Successfull", data: loggedInuser });

    }
    catch (err) {
        res.status(400).send("Error Occured: " + err.message);
    }
})
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        const { newPassword } = req.body;
        const loggedInuser = req.user;
        await validateEditPassword(req, loggedInuser);
        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        loggedInuser.password = newPasswordHash;
        loggedInuser.save();
        res.send("Password is updated successfully!!");
    }
    catch (err) {
        res.status(400).send("Update password failed: " + err.message);
    }
})

module.exports = profileRouter;