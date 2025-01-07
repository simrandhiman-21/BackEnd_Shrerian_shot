var express = require('express');
var app = express();
var path = require('path');

const userRouter=require('./routes/userRoutes');

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');


    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/user',userRouter);


    // app.get('/',(req,res)=>{
    //     res.render('index');
    // })


    app.listen(3000, () => {
        console.log(`Example app listening on port ${3000}`)
    })