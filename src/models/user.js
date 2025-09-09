const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Password should be strong");
      }
    }
  },
  age: {
    type: Number,
    min: 18
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "other"].includes(value)) {
        throw new Error("Gender is invalid");
      }
    }
  },
  about: {
    type: String,
    default: "this is default about of the user!"
  },
  photoUrl:{
    type:String,
    default:"https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
  },
  skills: {
    type: [String]
  }
}, {
  timestamps: true
});

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
  return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUset){
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(passwordInputByUset, passwordHash);
  return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);
