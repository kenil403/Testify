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
    // Log full error for diagnostics but do not crash the app; allow dev server to run without DB
    console.error('Failed to connect to MongoDB:', err && err.message ? err.message : err);
    if (err && err.stack) console.error(err.stack);
    console.error('MongoDB URI:', MONGO_URI ? MONGO_URI.replace(/:(.*)@/, ':*****@') : 'not set');
    console.error('Common causes: incorrect URI, network/DNS issues, IP not whitelisted in Atlas, or password requires URL-encoding.');
    // Don't exit - return false to indicate connect failure
    return false;
  }
}

export default connectDB;
