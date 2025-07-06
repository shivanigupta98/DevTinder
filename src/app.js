const express = require("express");

const app = express();
app.get('/users',(req,res)=>{
    res.send({
        firstName:"shivani",
        lastname:"gupta",
        age:"27"
    });
})
app.post('/users',(req,res)=>{
    console.log("Saved in database");
    res.send("Data has been saved successfully!");
})
app.delete('/users',(req,res)=>{
    console.log("Deleted the users data");
    res.send("Deleted successfully");
})
app.listen('3000', ()=>{
    console.log("Server is succesfully listening on port 3000");
});