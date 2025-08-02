const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const profileRouter= require('./routes/profileRouter');
const requestRouter = require('./routes/requestRouter');
const userRouter = require("./routes/userRouter");

app.use(express.json());
app.use(cookieParser());

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen("3000", () => {
      console.log("Server is succesfully listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected");
  });
