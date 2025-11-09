/*
  Import course paper sets from frontend course_*.js into MongoDB learning_papers.
  Categories: Mechanical Engineering, Computer Engineering, Electronics & Communication,
              Chemical Engineering, Civil Engineering, Electrical Engineering
  Usage: node scripts/import_course_papers.js
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

async function importCourse(category, modulePath, getters) {
  const mod = await import(pathToFileURL(modulePath).href);
  let imported = 0;
  for (let i = 0; i < getters.length; i++) {
    const getterName = getters[i];
    const getter = mod[getterName];
    if (typeof getter !== 'function') continue;
    const paper = getter();
    if (!paper || !Array.isArray(paper.questions) || paper.questions.length === 0) continue;
    const idNum = (i + 1);
    const doc = {
      category,
      paperId: `paper${idNum}`,
      name: paper.name || `${category} Paper ${idNum}`,
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
  return imported;
}

async function main() {
  if (!MONGO_URI) {
    console.error('No MongoDB connection string found in environment (MONGODB_URI).');
    process.exit(1);
  }
  await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 8000 });
  console.log('Connected to MongoDB');

  let total = 0;

  // Mechanical
  total += await importCourse(
    'Mechanical Engineering',
    path.resolve(__dirname, '../../frontend/src/data/course_mechanical.js'),
    ['getMechanicalPaperSet1','getMechanicalPaperSet2','getMechanicalPaperSet3','getMechanicalPaperSet4','getMechanicalPaperSet5']
  );

  // Computer
  total += await importCourse(
    'Computer Engineering',
    path.resolve(__dirname, '../../frontend/src/data/course_computer.js'),
    ['getComputerPaperSet1','getComputerPaperSet2','getComputerPaperSet3','getComputerPaperSet4','getComputerPaperSet5']
  );

  // Electronics & Communication
  total += await importCourse(
    'Electronics & Communication',
    path.resolve(__dirname, '../../frontend/src/data/course_electronics.js'),
    ['getElectronicsPaperSet1','getElectronicsPaperSet2','getElectronicsPaperSet3','getElectronicsPaperSet4','getElectronicsPaperSet5']
  );

  // Chemical
  total += await importCourse(
    'Chemical Engineering',
    path.resolve(__dirname, '../../frontend/src/data/course_chemical.js'),
    ['getChemicalPaperSet1','getChemicalPaperSet2','getChemicalPaperSet3','getChemicalPaperSet4','getChemicalPaperSet5']
  );

  // Civil
  total += await importCourse(
    'Civil Engineering',
    path.resolve(__dirname, '../../frontend/src/data/course_civil.js'),
    ['getCivilPaperSet1','getCivilPaperSet2','getCivilPaperSet3','getCivilPaperSet4','getCivilPaperSet5']
  );

  // Electrical
  total += await importCourse(
    'Electrical Engineering',
    path.resolve(__dirname, '../../frontend/src/data/course_electrical.js'),
    ['getElectricalPaperSet1','getElectricalPaperSet2','getElectricalPaperSet3','getElectricalPaperSet4','getElectricalPaperSet5']
  );

  console.log(`Imported/updated ${total} course papers across all categories.`);
  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error('Import failed:', err && err.message ? err.message : err);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});
