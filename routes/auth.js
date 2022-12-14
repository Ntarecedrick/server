const express = require('express');
const router = express.Router()



router.post('/Register', async (req,res)=>{
    res.send('register')
})

module.exports= router