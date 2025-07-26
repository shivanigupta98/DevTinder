const validator = require('validator');


const validateSignUpData = (req)=>{
    const {firstName, lastName, email, password} = req.body;
    if(!firstName || !lastName){
        throw new Error('Name is required');
    }
    else if(!validator.isEmail(email)){
        throw new Error('Email id is not valid');
    }
    else if (!validator.isStrongPassword(password)){
        throw new Error('Please enter a strong password');
    }
}
module.exports = {validateSignUpData};