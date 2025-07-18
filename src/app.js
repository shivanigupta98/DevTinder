const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  console.log(req.body);
  try {
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
