
const mongoose = require('mongoose');
const   userSchema = new mongoose.Schema({
    firstname:String,
    email:String,
    password:String,
})

const userModel = new mongoose.model("user", userSchema)
module.exports=userModel;