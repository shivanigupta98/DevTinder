const express = require("express");

const app = express();
app.use('/users',(req,res,next)=>{
const token = 'xyz'; // chsnge token for error
if(token==='xyz'){
    next();
}
else {
       throw new Error("Token invalid");
    }
})
app.get('/users', (req, res) => {
    res.send("Response!");
});

app.use((err,req,res,next)=>{
if(err){
    console.error("Error occured!",err.message);
    res.status(404).send("Unauthorized user");
}
})
app.listen('3000', ()=>{
    console.log("Server is succesfully listening on port 3000");
});