const express=require('express');
const userModel = require('../models/userModel');
const router =express.Router();

router.get('/test',(req,res)=>{
    res.send("i'm in testing routes config to app.js");
})

    router.get('/register',(req,res)=>{
        res.render('register');
    })

    router.post('/register',async (req,res)=>{
        console.log(req.body);
        const{firstname,email,password}=req.body;
        const user=await userModel.create({
            firstname,
            email,
            password
        });
        res.send(user);
    })
    //read
    router.get('/read',(req,res)=>{
        userModel.find().then((users)=>{
            res.send(users);
            })
    })
    

    //update 
    router.get('/update',(req,res)=>{
        userModel.findOneAndUpdate(
            {email:'simrandhiman404@gmail.com'},
            {firstname:'karanAujla'},
            {new:true}
        )
        .then((users)=>{
            res.send(users);
            })
    })

    //delete
    router.get('/delete',(req,res)=>{
        userModel.findOneAndDelete({email:'simrandhiman404@gmail.com'}).then((users)=>{
            res.send(users);
            })
    })


module.exports=router;
