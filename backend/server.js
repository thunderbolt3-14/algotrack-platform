import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import problemRoutes from './routes/problemRoutes.js';
// import postRoutes from './routes/postRoutes.js'; // Keep this if you have it

dotenv.config();
connectDB();

const app = express();

// 1. ALLOW ALL CORS (The "Open Door" Policy)
app.use(cors()); 

app.use(express.json());

// 2. NO CLERK MIDDLEWARE HERE
// We removed app.use(clerkMiddleware())

app.use('/api/problems', problemRoutes);
// app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));