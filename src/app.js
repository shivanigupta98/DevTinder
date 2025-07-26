const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const bcrypt = require('bcrypt');
const { validateSignUpData } = require('./utils/validation');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/userAuth");

app.use(express.json());
app.use(cookieParser());

app.post("/login", async (req, res) => {
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
app.post("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  }
  catch (err) {
    res.status(400).send("Error: " + err.message);
  }
})
app.post("/signup", async (req, res) => {
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
