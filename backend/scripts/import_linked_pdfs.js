import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import LearningResources from '../models/Learning_Resources.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGODB || process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('No MongoDB connection string found in env (MONGODB_URI/MONGODB/MONGO_URI).');
  process.exit(1);
}

const REPO_ROOT = path.resolve(process.cwd(), '..');
const FRONTEND_SRC = path.resolve(REPO_ROOT, 'frontend', 'src');
const PROJECT_PAPERS_ROOT = path.resolve(REPO_ROOT, 'frontend', 'project-papers');

function getArg(name, fallback) {
  const idx = process.argv.findIndex(a => a === `--${name}`);
  return idx !== -1 ? process.argv[idx + 1] : fallback;
}

const SRC_ROOT = getArg('src', FRONTEND_SRC);
const PAPERS_ROOT = getArg('papers', PROJECT_PAPERS_ROOT);

const MAX_BYTES = 15 * 1024 * 1024; // ~15MB safety cap
const PDF_LINK_RE = /['"`]\s*\/?project-papers[\\/][^'"`]+?\.pdf\s*['"`]/gi;

function listFilesRec(dir, exts = ['.js', '.jsx', '.ts', '.tsx']) {
  const out = [];
  let entries = [];
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...listFilesRec(full, exts));
    else if (e.isFile() && exts.includes(path.extname(e.name).toLowerCase())) out.push(full);
  }
  return out;
}

function collectLinkedPdfPaths() {
  const files = listFilesRec(SRC_ROOT);
  const rels = new Set();
  for (const file of files) {
    let text = '';
    try { text = fs.readFileSync(file, 'utf8'); } catch { continue; }
    const matches = text.match(PDF_LINK_RE);
    if (!matches) continue;
    for (const m of matches) {
      let p = m.replace(/^['"`]\s*/, '').replace(/\s*['"`]$/, '');
      p = p.split('?')[0].split('#')[0];
      if (p.startsWith('/')) p = p.slice(1);
      p = p.replace(/\\/g, '/');
      rels.add(p);
    }
  }
  return Array.from(rels);
}

function walkFindByFileName(root, fileName) {
  const stack = [root];
  while (stack.length) {
    const dir = stack.pop();
    let entries = [];
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { continue; }
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) stack.push(full);
      else if (e.isFile() && e.name === fileName) return full;
    }
  }
  return null;
}

function deriveMetaFromPath(fullPath, baseRoot) {
  const rel = path.relative(baseRoot, fullPath);
  const parts = rel.split(path.sep).filter(Boolean);
  const fileName = parts[parts.length - 1];
  const title = path.parse(fileName).name;
  
  // Extract section and subsection based on folder depth
  // For paths like: Reasoning/Logical Reasoning/Number Series1.pdf
  // Result: section="Logical Reasoning", subsection="Number Series"
  // For paths like: Aptitude/Problems on Trains/trains1.pdf
  // Result: section="Aptitude", subsection="Problems on Trains"
  
  let section = 'General';
  let subsection = 'Root';
  
  if (parts.length === 2) {
    // Only one folder: folder/file -> (General, file_name_without_ext)
    section = 'General';
    subsection = title;
  } else if (parts.length === 3) {
    // Two folders: folder1/folder2/file -> (folder2, file_name_without_ext)
    // This handles: Reasoning/Logical Reasoning/Number Series1.pdf
    // section="Logical Reasoning", subsection="Number Series"
    section = parts[1];
    subsection = title;
  } else if (parts.length >= 4) {
    // Three or more folders: folder1/folder2/folder3/.../file -> (folder2/folder3, file_name_without_ext)
    // Use second-to-last folder as section
    section = parts[parts.length - 2];
    subsection = title;
  }
  
  return { section, subsection, title, fileName };
}

async function main() {
  console.log('Scanning for linked PDFs in:', SRC_ROOT);
  console.log('Resolving files under:', PAPERS_ROOT);

  if (!fs.existsSync(SRC_ROOT)) {
    console.error('Source folder does not exist:', SRC_ROOT);
    process.exit(1);
  }
  if (!fs.existsSync(PAPERS_ROOT)) {
    console.error('project-papers folder does not exist:', PAPERS_ROOT);
    process.exit(1);
  }

  const relPaths = collectLinkedPdfPaths();
  console.log(`Found ${relPaths.length} unique PDF link(s) in source.`);

  await mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 8000,
    socketTimeoutMS: 15000,
    connectTimeoutMS: 15000,
    maxPoolSize: 4
  });
  console.log('Connected to MongoDB');

  let imported = 0, skipped = 0, notFound = 0, tooLarge = 0, failed = 0;
  for (const rel of relPaths) {
    try {
      const relUnderPapers = rel.replace(/^project-papers[\\/]/i, '');
      let full = path.join(PAPERS_ROOT, relUnderPapers);

      if (!fs.existsSync(full)) {
        const filename = path.basename(relUnderPapers);
        const found = walkFindByFileName(PAPERS_ROOT, filename);
        if (found) {
          console.warn(`Path correction: "${rel}" -> "${path.relative(PAPERS_ROOT, found)}"`);
          full = found;
        } else {
          console.warn(`Missing file for link: ${rel}`);
          notFound++;
          continue;
        }
      }

      const stat = fs.statSync(full);
      if (stat.size > MAX_BYTES) {
        console.warn(`Skip (too large >15MB): ${path.relative(PAPERS_ROOT, full)}`);
        tooLarge++;
        continue;
      }

      const { section, subsection, title, fileName } = deriveMetaFromPath(full, PAPERS_ROOT);

      const exists = await LearningResources.findOne({ title, section, subsection }).select('_id');
      if (exists) {
        console.log(`Skip (exists): [${section} -> ${subsection}] ${title}`);
        skipped++;
        continue;
      }

      const data = fs.readFileSync(full);
      await LearningResources.create({
        title,
        section,
        subsection,
        data,
        fileName,
        size: data.length,
        contentType: 'application/pdf'
      });
      console.log(`Imported: [${section} -> ${subsection}] ${fileName}`);
      imported++;
    } catch (e) {
      console.error('Failed to import:', rel, '-', e && e.message ? e.message : e);
      failed++;
    }
  }

  console.log(`Done. Imported: ${imported}, Skipped: ${skipped}, NotFound: ${notFound}, TooLarge: ${tooLarge}, Failed: ${failed}`);
  await mongoose.disconnect();
  process.exit(0);
}

main().catch(async (e) => {
  console.error('Fatal:', e && e.message ? e.message : e);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});
