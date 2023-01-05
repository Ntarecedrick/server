import User from '../models/user';
import bcrypt from 'bcryptjs';
import validateUser from '../validation/validateUser';


const registerUser=async (req,res)=>{
    const {error,value}= validateUser(req.body);

    if(error) return res.status(400).send(error.details[0].message)
   
    const emailExist= await User.findOne({email: req.body.email})

    if(emailExist) return res.status(409).send('email already Exist');

    const salt= await bcrypt.genSalt(10);
    const hashPassword= await bcrypt.hash(req.body.password, salt)


    const user= new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })
    await user.save();
    res.send(user)
}

export default registerUser