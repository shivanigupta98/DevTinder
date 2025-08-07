const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next)=>{
//Read the token
try {const {token} = req.cookies;
if(!token){
return res.status(401).send("Please Login");
}
const {_id} = jwt.verify(token, "Dev@Tinder24");
const user = await User.findById(_id);
if(!user){
throw new Error("User Not Found");
}
req.user = user;
next();}
catch(err){
    res.status(401).send("Error: "+err.message);
}
//Validate the token
//send the user
}

module.exports={userAuth};