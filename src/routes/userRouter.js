const express = require('express');
const userRouter = express.Router();
const { userAuth } = require('../middlewares/userAuth');
const ConnectionRequest = require('../models/connectionRequest');
const authRouter = require('./authRouter');

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

module.exports = userRouter;