// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { notFound, errorHandler } from './middleware/error.js';
import connectDB from './config/db.config.js';
import  cookieParser from 'cookie-parser'

// Import routes
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import postRoutes from './routes/postRoutes.js';

// Load env vars
dotenv.config();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// Enable CORS
app.use(cors({
  origin:" http://localhost:5173/",
  methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:"Content-Type,Authorization",
  credential:true
}));



connectDB();

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Blog API is running...' });
});

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/posts', postRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`);
});