import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
   res.json({ msg: 'The app is running' });
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
   console.log("Server listening on port", port);
});
