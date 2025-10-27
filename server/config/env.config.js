import dotenv from 'dotenv'
dotenv.config();
export const {MONGODB_URI, PORT, JWT_SECRET, NODE_ENV} = process.env;