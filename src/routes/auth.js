const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs')
const User = require('../models/user');
const jwt= require('jsonwebtoken');
const dotenv= require('dotenv');
const { validateUser } = require('../../validation/validateUser');

dotenv.config()


router.post('/Register', async (req,res)=>{
    const {error,value}= validateUser(req.body);

    if(error) return res.status(400).send(error.details[0].message)
   
    const emailExist= await User.findOne({email: req.body.email})

    if(emailExist) return res.status(400).send('email already Exist');

    const salt= await bcrypt.genSalt(10);
    const hashPassword= await bcrypt.hash(req.body.password, salt)


    const user= new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })
    await user.save();
    res.send(user)
});


router.post('/Login', async (req,res)=>{
    const userEmail= await User.findOne({email: req.body.email});
    
    if(!userEmail) return res.status(400).send('invalid email or Password ');
    const ValidPassword = await bcrypt.compare(req.body.password,userEmail.password);
    if(!ValidPassword) return res.status(400). send('invalid email or Password');

    
    const token = jwt.sign({_id: userEmail._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
})

module.exports= router