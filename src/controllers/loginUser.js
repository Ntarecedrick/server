import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

const loginUser= async (req,res)=>{
    const userEmail= await User.findOne({email: req.body.email});
    
    if(!userEmail) return res.status(400).send('invalid email or Password ');
    const ValidPassword = await bcrypt.compare(req.body.password,userEmail.password);
    if(!ValidPassword) return res.status(400). send('invalid email or Password');

    
    const token = jwt.sign({_id: userEmail._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
}

export default loginUser