const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://gshivani9516:NwUAdESOkCb4eAow@namaste-node-practice.n3mrnqf.mongodb.net/devTinder"
  );
};

module.exports = connectDB;