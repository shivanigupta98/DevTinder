const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error adding user!" + err.message);
  }
});

app.patch("/user/:userId", async (req, res) => {

  const userId = req.params.userId;
  const data = req.body;
  try {
    const AlLOWED_UPDATES = ["password", "age", "gender", "about", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) => AlLOWED_UPDATES.includes(k));
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if(data?.skills>10){
      throw new Error("Skills cannot be more than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true
    }
    )
    res.send("User details updated");
  }
  catch (err) {
    res.status(400).send("Error updating user!" + err.message);
  }
})

app.get("/user", async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.find({ email: email });
    if (user.length === 0) {
      res.status(404).send("User not found with this email id");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong!");
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
