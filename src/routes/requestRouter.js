const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/userAuth');
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/sent/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            throw new Error("User not found");
        }

        const ALLOWED_STATUSES = ["interested", "ignored"];
        if (!ALLOWED_STATUSES.includes(status)) {
            throw new Error(status + " not allowed");
        }

        const connectionExist = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }]

        })
        if(connectionExist){
            throw new Error("Connection already exists!!");
        }

        const connectionRequest = await new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        await connectionRequest.save();
        res.json({
            message: "Request sent with " + status,
            data: connectionRequest
        })
    }
    catch (err) {
        res.status(400).send("Error: " + err.message);
    }

});

module.exports = requestRouter;
