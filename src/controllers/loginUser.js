import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

const loginUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send('invalid email or Password ');
    const ValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!ValidPassword) return res.status(400).send('invalid email or Password');


    const token = jwt.sign({ _id: user._id, name: user.name, email: user.email } , process.env.TOKEN_SECRET);
    const UserObject = {
        userName: user.name,
        userEmail: user.email,
        userToken: token
    }
    res.header('auth-token', token).send(UserObject)
}

export default loginUser