import mongoose from 'mongoose';
import { env } from './index.js';

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log('🎊 Database connected successfully');
  } catch (error) {
    throw new Error(`Database connection failed : ${error.message}`);
  }
};

export default connectDB;
