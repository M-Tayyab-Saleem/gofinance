import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import connectDB from './config/mongoDB.js';



const app = express();
import authRouter from './routes/authRouter.js';

const port = process.env.PORT || 4000
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true}));

//API Endpoints
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/api/auth', authRouter);    

app.listen(port, ()=> console.log(`Server started on Port: ${port}`));