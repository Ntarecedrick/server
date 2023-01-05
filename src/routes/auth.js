import express from 'express';
const router = express.Router();
import registerUser from '../controllers/registerUser';
import loginUser from '../controllers/loginUser';
import passport from "passport";

router.post('/register', registerUser );

router.post('/login', loginUser );


router.get('/google', passport.authenticate('google',{
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), async(req,res)=>{
    res.send('welcome to my brand guys ')
})

export default router 
