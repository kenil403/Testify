import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGODB || process.env.MONGO_URI;

// Do not buffer model operations when offline; fail fast instead of hanging
mongoose.set('bufferCommands', false);

let dbConnected = false;

export const isDbConnected = () => dbConnected;

function attachConnectionLogging() {
  const redactedUri = MONGO_URI ? MONGO_URI.replace(/:(.*)@/, ':*****@') : 'not set';
  mongoose.connection.on('connected', () => {
    dbConnected = true;
    console.log('MongoDB connected');
  });
  mongoose.connection.on('reconnected', () => {
    dbConnected = true;
    console.log('MongoDB reconnected');
  });
  mongoose.connection.on('disconnected', () => {
    dbConnected = false;
    console.warn('MongoDB disconnected');
  });
  mongoose.connection.on('error', (err) => {
    dbConnected = false;
    console.error('MongoDB connection error:', err && err.message ? err.message : err);
    if (err && err.stack) console.error(err.stack);
    console.error('MongoDB URI:', redactedUri);
  });
}

export async function connectDB() {
  if (!MONGO_URI) {
    console.error('No MongoDB connection string found in environment (MONGODB_URI). Skipping DB connect.');
    return;
  }

  try {
    attachConnectionLogging();
    await mongoose.connect(MONGO_URI, {
      // Fail fast on server selection
      serverSelectionTimeoutMS: 5000,
      // Reasonable socket/connect timeouts for dev
      socketTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      // Keep pool modest for local/dev
      maxPoolSize: 5,
      retryReads: true,
      retryWrites: true
    });
    dbConnected = true;
    console.log('Connected to MongoDB');
  } catch (err) {
    // Log full error for diagnostics but do not crash the app; allow dev server to run without DB
    console.error('Failed to connect to MongoDB:', err && err.message ? err.message : err);
    if (err && err.stack) console.error(err.stack);
    console.error('MongoDB URI:', MONGO_URI ? MONGO_URI.replace(/:(.*)@/, ':*****@') : 'not set');
    console.error('Common causes: incorrect URI, network/DNS issues, IP not whitelisted in Atlas, or password requires URL-encoding.');
    // Don't exit - return false to indicate connect failure
    dbConnected = false;
    return false;
  }
}

export default connectDB;
