import mongoose from 'mongoose';
import express from 'express'
import router from './routes/router';
import authRoutes from './routes/auth';
const app = express();
app.use(express.json({limit: '500mb'}))
// app.use(express.urlencoded({limit:'500mb'}))

try {
    mongoose.set('strictQuery', false)
    mongoose.connect("mongodb://localhost:27017/serverDB", { useNewUrlParser: true });
    app.use("/api", router);
    app.use('/user', authRoutes);
    app.listen(2002, () => {
        console.log('server started');
    })
    
} catch (error) {
    console.log(error)
}

export default app