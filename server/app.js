import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import connectDB from './config/mongoDB.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';


const app = express();

const port = process.env.PORT || 8000
connectDB();

const allowedOrigins = ['http://localhost:5173'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins ,credentials: true}));

//API Endpoints
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/api/auth', authRouter);  
app.use('/api/user', userRouter);  

app.listen(port, ()=> console.log(`Server started on Port: ${port}`));