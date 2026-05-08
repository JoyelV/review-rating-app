import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Company from './src/models/Company.js';
import Review from './src/models/Review.js';

dotenv.config();

const cleanupDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    await Company.deleteMany({});
    await Review.deleteMany({});
    console.log('Database cleared successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error clearing database:', error);
    process.exit(1);
  }
};

cleanupDB();
