import express from 'express';
import User from '../models/User.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

// Add a test result for the authenticated user
router.post('/add', verifyToken, async (req, res) => {
  try {
    const { category, score, rank } = req.body;
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const entry = { category, score: Number(score || 0), rank: rank || null, date: new Date() };
    user.testHistory = user.testHistory || [];
    user.testHistory.unshift(entry); // add latest first
    await user.save();

    res.json({ message: 'Test result saved', entry, testHistory: user.testHistory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get test history for authenticated user
router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId).select('testHistory');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ testHistory: user.testHistory || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
