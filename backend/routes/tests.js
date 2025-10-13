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

    // Do not persist practice/tests meant only for practice
    if (category && /practice/i.test(category)) {
      // Return success but do not modify DB
      return res.json({ message: 'Practice tests are not recorded', entry: null, testHistory: user.testHistory || [] });
    }

    const entry = { category, score: Number(score || 0), rank: rank || null, date: new Date() };

    // Atomic insert: only push the new entry if the latest entry is not a duplicate
    const cutoff = new Date(Date.now() - 60 * 1000); // 1 minute

    // The filter allows update when either there is no latest entry matching (category/score), or latest entry is older than cutoff
    const filter = {
      _id: userId,
      $or: [
        { 'testHistory.0.category': { $ne: category } },
        { 'testHistory.0.score': { $ne: Number(score || 0) } },
        { 'testHistory.0.date': { $lt: cutoff } }
      ]
    };

    const updated = await User.findOneAndUpdate(
      filter,
      { $push: { testHistory: { $each: [entry], $position: 0 } } },
      { new: true }
    );

    if (!updated) {
      // If update didn't happen, it means the latest entry matched and was within the cutoff window -> treat as duplicate
      const fresh = await User.findById(userId).select('testHistory');
      return res.json({ message: 'Duplicate test entry ignored', entry: null, testHistory: fresh ? fresh.testHistory : [] });
    }

    res.json({ message: 'Test result saved', entry, testHistory: updated.testHistory });
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
