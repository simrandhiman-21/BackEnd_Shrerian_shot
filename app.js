var express = require('express');
var app = express();
var path = require('path');
const indexRouter=require('./routes/indexRoutes');
const userRouter=require('./routes/userRoutes');
const {body,validatoonResult}=require('express-validator');
const dotenv=require('dotenv');
dotenv.config(); //top 

const connecttoDB=require('./config/db');
connecttoDB()

const cookieParser=require('cookie-parser');

const userModel=require('./models/userModel');
const userloginModel=require('./models/userloginModel');

const connection=require('./config/db');
   
const { request } = require('http');
const exp = require('constants');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())


//config routes 
    app.use('/',indexRouter);
    app.use('/user',userRouter); 



    app.get('/',(req,res)=>{
        res.render('index');
    })

    app.listen(3000, () => {
        console.log(`Example app listening on port ${3000}`)
    })