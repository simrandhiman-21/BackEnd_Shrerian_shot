const mongoose = require('mongoose');
const   userloginSchema = new mongoose.Schema({
    firstname:String,
    email:String,
    password:String,

})