import express from 'express';
const router = express.Router();
import registerUser from '../controllers/registerUser';
import loginUser from '../controllers/loginUser';

router.post('/Register', registerUser );

router.post('/Login', loginUser )

export default router