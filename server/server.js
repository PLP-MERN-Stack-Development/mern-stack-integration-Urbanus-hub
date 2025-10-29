// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/error.js';
import { clerkAuth } from './middleware/clerkAuth.js';
import connectDB from './config/db.config.js';
import { PORT } from './config/env.config.js';

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

// Enable CORS
app.use(cors());

// Apply Clerk middleware globally
app.use(clerkAuth);



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



app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});