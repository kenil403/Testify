import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGODB || process.env.MONGO_URI;

async function run() {
  if (!MONGO_URI) {
    console.error('No MONGO_URI found in environment. Please set MONGODB_URI in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    const conn = mongoose.connection;
    console.log('Connected to', conn.name || '(no db name in URI)');

    const db = conn.db;
    if (!db) {
      console.log('No db object available on mongoose connection.');
      process.exit(1);
    }

    const collections = await db.listCollections().toArray();
    if (!collections.length) {
      console.log('No collections found in this database.');
      await mongoose.disconnect();
      process.exit(0);
    }

    for (const c of collections) {
      const count = await db.collection(c.name).countDocuments();
      console.log(`Collection: ${c.name} — ${count} docs`);
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error('Error connecting or listing collections:', err.message || err);
    process.exit(1);
  }
}

run();
