var express = require('express');
var app = express();
var path = require('path');
const userRouter=require('./routes/userRoutes');


const userModel=require('./models/userModel');
const connection=require('./config/db');

const { request } = require('http');
const exp = require('constants');

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');


    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/user',userRouter); //config routes 


    app.get('/',(req,res)=>{
        res.render('index');
    })

    app.listen(3000, () => {
        console.log(`Example app listening on port ${3000}`)
    })