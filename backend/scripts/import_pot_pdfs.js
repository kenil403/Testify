import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import LearningResources from '../models/Learning_Resources.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGODB || process.env.MONGO_URI;

// Source directory (Problem on Trains under Apptitude)
const ROOT = path.resolve(process.cwd(), '..');
const POT_DIR = path.join(ROOT, 'frontend', 'project-papers', 'Apptitude', 'Problems on Trains');

async function connect() {
  await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 10000, socketTimeoutMS: 20000 });
  console.log('Connected to MongoDB');
}

function isPdf(name) { return name.toLowerCase().endsWith('.pdf'); }

function titleFrom(name) { return name.replace(/_/g, ' ').replace(/\.pdf$/i, ''); }

async function importOne(fullPath, section, subsection) {
  const stat = fs.statSync(fullPath);
  if (!stat.isFile()) return;
  // Hard limit: MongoDB document max ~16MB. Skip oversized PDFs when embedding.
  const MAX_BSON = 16 * 1024 * 1024; // 16MB
  if (stat.size > MAX_BSON) {
    console.warn(`Skip oversized PDF (>16MB): ${fullPath}`);
    return;
  }
  const filename = path.basename(fullPath);
  const title = titleFrom(filename);

  // Skip if already present (by title+section+subsection)
  const exists = await LearningResources.findOne({ title, section, subsection });
  if (exists) {
    console.log('Skip existing:', filename);
    return;
  }

  // Read the file into memory and store in the document
  const data = fs.readFileSync(fullPath);
  await LearningResources.create({
    title,
    section,
    subsection,
    data,
    fileName: filename,
    size: stat.size,
    contentType: 'application/pdf'
  });
  console.log('Imported:', filename);
}

async function run() {
  if (!MONGO_URI) {
    console.error('MONGODB_URI not set in environment');
    process.exit(1);
  }

  const section = 'Apptitude';
  const subsection = 'Problems on Trains';

  if (!fs.existsSync(POT_DIR)) {
    console.error('Source folder not found:', POT_DIR);
    process.exit(1);
  }

  await connect();
  try {
    const files = fs.readdirSync(POT_DIR).filter(isPdf);
    console.log(`Found ${files.length} PDF(s) in ${POT_DIR}`);
    for (const f of files) {
      await importOne(path.join(POT_DIR, f), section, subsection);
    }
    console.log('Import complete.');
  } catch (e) {
    console.error('Import failed:', e);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
