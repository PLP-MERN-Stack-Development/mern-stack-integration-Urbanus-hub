// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.config.js';
import { PORT, NODE_ENV} from './config/env.config.js';
import { notFound, errorHandler } from './middleware/error.js';

// Import routes
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import postRoutes from './routes/postRoutes.js';


const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Connect to MongoDB


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
  console.log(`Server running in ${NODE_ENV} mode at http://localHost:${PORT}`);
});

export default app;