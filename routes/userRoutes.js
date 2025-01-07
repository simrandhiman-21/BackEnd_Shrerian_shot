const express=require('express');
const router =express.Router();

router.get('/test',(req,res)=>{
    res.send("i'm in testing routes config to app.js");
})

    router.get('/register',(req,res)=>{
        res.render('register');
    })

    router.post('/register',(req,res)=>{
        console.log(req.body);
        res.send("form submitted ");
    })


module.exports=router;
