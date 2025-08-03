const express = require('express');
const userRouter = express.Router();
const { userAuth } = require('../middlewares/userAuth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');
const mongoose = require('mongoose');


const USER_INFO = "firstName lastName age skills gender about";
userRouter.get('/user/request/received', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: 'interested',
        }).populate("fromUserId", USER_INFO);

        res.json({
            message: "Data fetched successfully!",
            data: connectionRequests
        });
    }
    catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});
userRouter.get('/user/connections', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" }
            ]
        }).populate("fromUserId", USER_INFO).populate("toUserId", USER_INFO);

        const data = connectionRequests.map((connection) => {
            if (connection.toUserId._id.toString() === loggedInUser._id.toString()) {
                return connection.fromUserId;
            }
            return connection.toUserId;
        })
        res.json({
            message: "Connections Fetched Successfully!",
            data
        })
    }
    catch (err) {

    }
})
userRouter.get('/user/feed', userAuth, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or: [{ toUserId: loggedInUser._id },
            { fromUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId");

        let hideConnectionsonFeed = new Set();
        connectionRequests.map((user) => {
            hideConnectionsonFeed.add(user.toUserId.toString());
            hideConnectionsonFeed.add(user.fromUserId.toString());
        })
        const feed = await User.find({
            $and: [{ _id: { $nin: Array.from(hideConnectionsonFeed) } },
            { _id: { $ne: loggedInUser._id } }]
        }).select(USER_INFO).skip(skip).limit(limit);

        res.json({ feed });

    }
    catch (err) {
        res.status(400).send("Error: " + err.message);
    }

})
module.exports = userRouter;