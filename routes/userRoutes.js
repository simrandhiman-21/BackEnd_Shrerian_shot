const express=require('express');
const router =express.Router();
const userModel = require('../models/userModel');
const userloginModel=require('../models/userloginModel');
const { validationResult } = require('express-validator');
const {body,validatoonResult}=require('express-validator');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


router.get('/test',(req,res)=>{
    res.send("i'm in testing routes config to app.js");
})

    router.get('/register',(req,res)=>{
        res.render('register');
    })

    router.post('/register',
    [
        body('firstname').trim().isLength({ min: 3 }).withMessage('First name must be at least 3 characters long.'),
        body('email').isEmail().withMessage('Please provide a valid email address.'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long.'),
    ],
    async (req,res)=>{
        console.log(req.body);

        const errors = validationResult(req);

        // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const{firstname,email,password}=req.body;

        const hasspassword=await bcrypt.hash(password,10)

    try{
            const existinguser=await userModel.findOne({email});
            if(existinguser){
                return res.status(400).json({msg:'User already exists'});
            }

        const newuser=await userModel.create({
            firstname,
            email,
            password:hasspassword
        });
        res.status(201).json({ message: 'User registered successfully.', user: newuser });
     }
     catch{
        console.log(error);
     }
    }
)


    

    // //read
    // router.get('/read',(req,res)=>{
    //     userModel.find().then((users)=>{
    //         res.send(users);
    //         })
    // })
    

    // //update 
    // router.get('/update',(req,res)=>{
    //     userModel.findOneAndUpdate(
    //         {email:'simrandhiman404@gmail.com'},
    //         {firstname:'karanAujla'},
    //         {new:true}
    //     )
    //     .then((users)=>{
    //         res.send(users);
    //         })
    // })

    // //delete
    // router.get('/delete',(req,res)=>{
    //     userModel.findOneAndDelete({email:'simrandhiman404@gmail.com'}).then((users)=>{
    //         res.send(users);
    //         })
    // })

    //login 
    router.get('/login',(req,res)=>{
        res.render('login');
    })

    router.post('/login',
        body('firstname').trim().isLength({ min: 3 }),
        body('password').isLength({min:5}),
    async (req,res)=>{
        const errors=validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).send({errors:errors.array(),
                message:'Invalid data'
            }
        );
        }

        const {firstname,password}=req.body;  //input feild de hai user ne

        // Find user by firstname (or email)
        const user = await userModel.findOne({ firstname });

        if(!user){
            return res.status(400).send({message:'Invalid data'});
        }
          

         // bcrypt

        const isMatch=await bcrypt.compare(password,user.password) 

        if(!isMatch){
            return res.status(400).send({message:'Invalid data'});
        }


        //jsonerbtoken 

        const token=jwt.sign({
            userId:user._id,
            email:user.email,
            firstname:user.firstname            
        },
        process.env.SECRET_KEY);

    //   return  res.json({
    //     token
    //   })

        res.cookie('token',token)
        res.send('Logged In')


    }
);

module.exports=router;
