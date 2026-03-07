import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import problemRoutes from './routes/problemRoutes.js';
import postRoutes from './routes/postRoutes.js';
import { clerkMiddleware } from '@clerk/express'; // <--- IMPORT THIS

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// <--- ADD THIS LINE (Must be before routes)
// This checks the token on every request and puts user info into req.auth
app.use(clerkMiddleware()); 

app.use('/api/problems', problemRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));