import express from 'express'
import mongoose from 'mongoose';
import router from'./routes/router';
import authRoutes from'./routes/auth';
import passPostSetUp from './services/passPortSetUp'

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


