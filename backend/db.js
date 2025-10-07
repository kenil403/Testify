import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGODB || process.env.MONGO_URI;

export async function connectDB() {
  if (!MONGO_URI) {
    console.error('No MongoDB connection string found in environment (MONGODB_URI). Skipping DB connect.');
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      // useNewUrlParser and useUnifiedTopology are defaults in Mongoose 6+
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message || err);
    process.exit(1);
  }
}

export default connectDB;
