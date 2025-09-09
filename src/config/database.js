const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI not defined in environment");
  }

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Database cannot be connected:", err);
    throw err;
  }
};

module.exports = connectDB;
