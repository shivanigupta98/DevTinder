const validator = require('validator');
const bcrypt= require('bcrypt');


const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error('Name is required');
    }
    else if (!validator.isEmail(email)) {
        throw new Error('Email id is not valid');
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error('Please enter a strong password');
    }
}
const validateEditData = (req) => {
    const ALLOWED_EDIT_FIELDS = ['age', 'about', 'skills', 'gender','photoUrl'];
    const isEditAllowed = Object.keys(req.body).every((field) => ALLOWED_EDIT_FIELDS.includes(field));
    return isEditAllowed;
}
const validateEditPassword = async (req,loggedInuser)=>{
    const{currentPassword, newPassword} = req.body;
    const isPasswordValid = await bcrypt.compare(currentPassword, loggedInuser.password);
    if(!isPasswordValid){
        throw new Error("Password is incorrect");
    }
    else if(!validator.isStrongPassword(newPassword)){
        throw new Error("Please enter a strong Password");
    }
}
module.exports = { validateSignUpData, validateEditData, validateEditPassword };