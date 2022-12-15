const express = require('express');
const mongoose = require('mongoose');
const router = require('./src/routes/router');
const authRoutes= require('./src/routes/auth');

mongoose.set('strictQuery', false)
mongoose.connect("mongodb://localhost:27017/serverDB", { useNewUrlParser: true }).then(() => {
    const app = express();
    app.use(express.json())
    app.use("/api",router);
    app.use('/api/user', authRoutes);
   

    app.listen(2002, () => {
        console.log('server started');
    })
})


