import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config({ path: './config/.env' })

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillforge');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected; driver will retry operations'));
    mongoose.connection.on('error', (error) => console.error(`MongoDB connection error: ${error.message}`));
  } catch (error) {
    console.error(`MongoDB Error: ${error.message}`);
    throw error;
  }
};

export default connectDB;