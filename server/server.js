import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import 'dotenv/config'; // This loads environment variables from .env
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

await connectDB()


app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)
app.get('/', (req, res) => res.send("API is WORKING fine"));

app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`));


//localhost:5000/api/user/register  

//localhost:5000/api/user/register