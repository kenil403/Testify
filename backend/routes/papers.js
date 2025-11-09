import express from 'express';
import { isDbConnected } from '../db.js';
import LearningPaper from '../models/Learning_Paper.js';

const router = express.Router();

// List papers by category (e.g., Aptitude)
router.get('/', async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({ message: 'Database unavailable', items: [] });
    }
    const { category } = req.query;
    const filter = category ? { category } : {};
    const items = await LearningPaper.find(filter).select('-questions').sort({ paperId: 1 }).lean();
    res.json({ items });
  } catch (err) {
    console.error('Error in GET /api/papers:', err && err.message ? err.message : err);
    res.status(500).json({ message: 'Server error', items: [] });
  }
});

// Get full paper by category + paperId (string like paper1)
router.get('/:category/:paperId', async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({ message: 'Database unavailable' });
    }
    const { category, paperId } = req.params;
    const doc = await LearningPaper.findOne({ category, paperId }).lean();
    if (!doc) return res.status(404).json({ message: 'Paper not found' });
    res.json({ paper: doc });
  } catch (err) {
    console.error('Error in GET /api/papers/:category/:paperId:', err && err.message ? err.message : err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Assign paper for a user for a category (stateless basic rotation based on optional last parameter)
router.post('/assign', async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({ message: 'Database unavailable' });
    }
    const { category, lastPaperId } = req.body || {};
    if (!category) return res.status(400).json({ message: 'category is required' });

    const papers = await LearningPaper.find({ category }).select('paperId').sort({ paperId: 1 }).lean();
    if (!papers || papers.length === 0) return res.status(404).json({ message: 'No papers available' });

    const ids = papers.map(p => p.paperId);
    // Simple rotation: pick next after lastPaperId, else first
    let pick = ids[0];
    if (lastPaperId && ids.includes(lastPaperId)) {
      const idx = ids.indexOf(lastPaperId);
      pick = ids[(idx + 1) % ids.length];
    }
    res.json({ paperId: pick });
  } catch (err) {
    console.error('Error in POST /api/papers/assign:', err && err.message ? err.message : err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
