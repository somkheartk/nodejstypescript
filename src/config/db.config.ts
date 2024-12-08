import mongoose from 'mongoose';
import {dotenv} from 'dotenv';  
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI ?? 'mongodb://localhost:27017/mydb');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
