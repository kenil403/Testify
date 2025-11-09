import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import LearningResources from '../models/Learning_Resources.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGODB || process.env.MONGO_URI;

// Workspace roots
const BACKEND_CWD = process.cwd();
// When running as `node scripts/import_from_learning_data.js` (cwd=backend)
const ROOT = path.resolve(BACKEND_CWD, '..');
const FRONTEND_DIR = path.join(ROOT, 'frontend');
const LEARNING_DATA_FILE = path.join(FRONTEND_DIR, 'src', 'data', 'learningData.js');

const MAX_BSON = 16 * 1024 * 1024; // 16MB

function isPdfPath(p) {
  return typeof p === 'string' && p.toLowerCase().endsWith('.pdf');
}

function isPlaceholder(p) {
  return /\/pdfs\/placeholder\.(pdf|docx?|rtf)$/i.test(p || '');
}

function normalizeFsPath(frontendPathLike) {
  // learningData paths typically start with "/project-papers/..." (web root)
  const clean = String(frontendPathLike).replace(/^\//, '');
  return path.join(FRONTEND_DIR, clean);
}

function deriveSectionSubsectionFromPath(frontendPathLike, fallbackSection, fallbackSubPathParts) {
  // Example: /project-papers/Apptitude/Problems on Trains/Problems on Trains2.pdf
  //           ^0              ^1        ^2               ^3(file)
  const clean = String(frontendPathLike).replace(/^\//, '');
  const parts = clean.split(/[\\/]+/); // tolerate both separators
  let section = fallbackSection || null;
  let subsection = null;
  const idx = parts.indexOf('project-papers');
  if (idx !== -1) {
    section = parts[idx + 1] || section;
    subsection = parts[idx + 2] || null;
  }
  // Fallbacks
  if (!section) section = fallbackSection || 'General';
  if (!subsection) subsection = (fallbackSubPathParts && fallbackSubPathParts.length)
    ? fallbackSubPathParts.join(' / ')
    : 'General';
  return { section, subsection };
}

async function connect() {
  if (!MONGO_URI) {
    throw new Error('MONGODB_URI not set in environment');
  }
  await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 10000, socketTimeoutMS: 20000 });
  console.log('MongoDB connected');
}

async function upsertPdf({ title, section, subsection, fsPath }) {
  const stat = fs.statSync(fsPath);
  if (!stat.isFile()) return false;
  if (stat.size > MAX_BSON) {
    console.warn(`Skip oversized PDF (>16MB): ${fsPath}`);
    return false;
  }
  const filename = path.basename(fsPath);

  // Idempotent: avoid duplicates by title+section+subsection
  const exists = await LearningResources.findOne({ title, section, subsection });
  if (exists) {
    console.log(`Skip existing: ${title} [${section} / ${subsection}]`);
    return false;
  }

  const data = fs.readFileSync(fsPath);
  await LearningResources.create({
    title,
    section,
    subsection,
    data,
    fileName: filename,
    size: stat.size,
    contentType: 'application/pdf'
  });
  console.log(`Imported: ${title} [${section} / ${subsection}]`);
  return true;
}

function* walkLearningData(node, pathStack = []) {
  // Yields items of shape: { title, path, sectionHint, subPathParts }
  if (!node) return;
  if (Array.isArray(node)) {
    for (const item of node) {
      if (!item || typeof item !== 'object') continue;
      const title = item.name || item.title || null;
      const p = item.path || item.url || null;
      if (!title || !p) continue;
      yield { title, path: p, sectionHint: pathStack[0] || null, subPathParts: pathStack.slice(1) };
    }
  } else if (typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      yield* walkLearningData(v, [...pathStack, k]);
    }
  }
}

async function run() {
  console.log('Importer: from learningData.js');
  console.log('Frontend at:', FRONTEND_DIR);
  if (!fs.existsSync(LEARNING_DATA_FILE)) {
    console.error('Cannot find learningData.js at:', LEARNING_DATA_FILE);
    process.exit(1);
  }

  // Load learningData.js as ESM dynamically
  const fileUrl = pathToFileURL(LEARNING_DATA_FILE).href;
  let learningData;
  try {
    const mod = await import(fileUrl);
    learningData = mod.learningData;
  } catch (e) {
    console.error('Failed to import learningData.js:', e && e.message ? e.message : e);
    process.exit(1);
  }
  if (!learningData || typeof learningData !== 'object') {
    console.error('learningData export not found or invalid');
    process.exit(1);
  }

  await connect();

  let total = 0;
  let imported = 0;
  let skipped = 0;

  try {
    for (const item of walkLearningData(learningData)) {
      const p = item.path;
      if (!isPdfPath(p) || isPlaceholder(p)) { skipped++; continue; }
      const fsPath = normalizeFsPath(p);
      if (!fs.existsSync(fsPath)) {
        console.warn('File not found, skip:', fsPath);
        skipped++;
        continue;
      }
      const { section, subsection } = deriveSectionSubsectionFromPath(p, item.sectionHint, item.subPathParts);
      total++;
      try {
        const ok = await upsertPdf({ title: item.title, section, subsection, fsPath });
        if (ok) imported++; else skipped++;
      } catch (e) {
        console.error('Failed to import item:', item.title, e && e.message ? e.message : e);
        skipped++;
      }
    }
  } finally {
    await mongoose.disconnect();
  }

  console.log('--- Summary ---');
  console.log('Candidates:', total);
  console.log('Imported:', imported);
  console.log('Skipped:', skipped);
}

run().catch(async (e) => {
  console.error('Importer crashed:', e && e.message ? e.message : e);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});
