import mongoose from 'mongoose';
import express from 'express';
import router from './routes/router';
import authRoutes from './routes/auth';
import "dotenv/config"

const app = express();
app.use(express.json({limit: '500mb'}));

try {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.URL, { useNewUrlParser: true });

    app.use("/api", router);
    app.use('/user', authRoutes);
    app.use((req, res) => res.status(400).json({
        Error: 'No Such Request/Content',
        }));
    app.listen(2002, () => {
        console.log('server started');
    })
    
} catch (error) {
    console.log(error)
}

export default app