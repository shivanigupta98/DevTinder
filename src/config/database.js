const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI); 
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Database cannot be connected:", err);
    throw err;
  }
};

module.exports = connectDB;
