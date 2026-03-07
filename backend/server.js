import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import problemRoutes from './routes/problemRoutes.js';
import postRoutes from './routes/postRoutes.js'; // <-- 1. ADD THIS IMPORT

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Cluster connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.use('/api/problems', problemRoutes); 
app.use('/api/posts', postRoutes); // <-- 2. ADD THIS ROUTE

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'AlgoTrack Backend API is running smoothly!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});