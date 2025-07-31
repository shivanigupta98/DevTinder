const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["accepted", "interested", "rejected", "ignored"],
            message: '{Value} is not allowed'
        }
    }
}, {
    timestamps: true
}
);

connectionRequestSchema.pre("save", function (next) {
    if (this.fromUserId.equals(this.toUserId)) {
        throw new Error("User cannot connect with their own profile");
    }
})

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);