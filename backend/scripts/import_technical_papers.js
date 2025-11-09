/*
  Import Technical paper sets from frontend TechnicalTestBank.js into MongoDB learning_papers.
  Usage: node scripts/import_technical_papers.js
*/
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import LearningPaper from '../models/Learning_Paper.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGODB || process.env.MONGO_URI;

async function main() {
  if (!MONGO_URI) {
    console.error('No MongoDB connection string found in environment (MONGODB_URI).');
    process.exit(1);
  }
  await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 8000 });
  console.log('Connected to MongoDB');

  const technicalPath = path.resolve(__dirname, '../../frontend/src/data/TechnicalTestBank.js');
  const mod = await import(pathToFileURL(technicalPath).href);

  const getters = [
    mod.getTechnicalPaperSet1,
    mod.getTechnicalPaperSet2,
    mod.getTechnicalPaperSet3,
    mod.getTechnicalPaperSet4,
    mod.getTechnicalPaperSet5,
    mod.getTechnicalPaperSet6,
  ];

  let imported = 0;
  for (let i = 0; i < getters.length; i++) {
    const getter = getters[i];
    if (typeof getter !== 'function') continue;
    const paper = getter();
    if (!paper || !Array.isArray(paper.questions) || paper.questions.length === 0) continue;

    const paperId = paper.paperId || `tech-paper${i + 1}`;
    const doc = {
      category: 'Technical',
      paperId,
      name: paper.name || `Technical Paper ${i + 1}`,
      duration: Number(paper.duration || 60),
      totalQuestions: Number(paper.totalQuestions || (paper.questions?.length || 60)),
      questions: paper.questions.map(q => ({
        question: q.question,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation || ''
      }))
    };

    await LearningPaper.updateOne(
      { category: doc.category, paperId: doc.paperId },
      { $set: doc },
      { upsert: true }
    );
    imported++;
    console.log(`Upserted ${doc.category} ${doc.paperId} (${doc.name}) with ${doc.questions.length} questions.`);
  }

  console.log(`Imported/updated ${imported} Technical papers.`);
  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error('Import failed:', err && err.message ? err.message : err);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});
