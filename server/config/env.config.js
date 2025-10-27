import dotenv from 'dotenv'
dotenv.config();
export const {MONGODB_URI, PORT, JWT_SECRET, NODE_ENV, JWT_EXPIRE} = process.env;