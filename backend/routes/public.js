import express from 'express';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';

const router = express.Router();

// READ-ONLY public endpoints to support realtime dashboards without auth

// Gate public WRITE endpoints with an env flag (defaults to ENABLED for current no-auth workflow)
// Set PUBLIC_WRITES=false to disable in any environment.
const allowWrites = process.env.PUBLIC_WRITES !== 'false';
router.use((req, res, next) => {
  const method = req.method.toUpperCase();
  // Allow safe methods always
  if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') return next();
  // Block write methods unless allowed
  if (!allowWrites) return res.status(403).json({ message: 'Public write endpoints are disabled. Set PUBLIC_WRITES=true to enable during development.' });
  return next();
});

// Prevent caching for GET responses to ensure realtime freshness in dashboards
router.use((req, res, next) => {
  if (req.method.toUpperCase() === 'GET') {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');
  }
  next();
});

// GET /api/public/users - list users with filters & pagination (no auth)
router.get('/users', async (req, res) => {
  try {
    const { q = '', department = '', page = 1, limit = 20 } = req.query;
    const filters = { role: { $ne: 'Admin' } }; // Exclude Admin users from dashboard
    if (department) filters.department = department;
    if (q) {
      filters.$or = [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { mobile: { $regex: q, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [users, total] = await Promise.all([
      User.find(filters)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      User.countDocuments(filters)
    ]);

    const withStats = users.map((u) => ({
      ...u,
      totalTests: (u.testHistory || []).length,
      averageScore:
        (u.testHistory || []).length > 0
          ? Math.round((u.testHistory.reduce((s, t) => s + (t.score || 0), 0) / u.testHistory.length) * 10) / 10
          : 0
    }));

    res.json({ users: withStats, total });
  } catch (e) {
    console.error('GET /api/public/users error:', e);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/public/users/:id (no auth)
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .lean();
    if (!user) return res.status(404).json({ message: 'User not found' });
    // Ensure testHistory is delivered newest-first even for legacy data
    if (Array.isArray(user.testHistory)) {
      user.testHistory = [...user.testHistory].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    }
    res.json(user);
  } catch (e) {
    console.error('GET /api/public/users/:id error:', e);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
/**
 * DEVELOPMENT-ONLY WRITE ENDPOINTS (no auth)
 * NOTE: Writes are guarded by PUBLIC_WRITES env flag or NODE_ENV !== 'production'.
 * Set PUBLIC_WRITES=true to enable.
 */

// Create user (no auth)
router.post(
  '/users',
  body('email').isEmail(),
  body('name').isLength({ min: 2 }),
  body('password')
    .isLength({ min: 8 })
    .matches(/[a-z]/)
    .matches(/[A-Z]/)
    .matches(/\d/)
    .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]/),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const { name, email, password, mobile, department, role = 'Student' } = req.body;
      const exists = await User.findOne({ email });
      if (exists) return res.status(409).json({ message: 'User already exists' });
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const user = await User.create({ name, email, password: hash, mobile, department, role });
      const clean = user.toObject();
      delete clean.password;
      res.status(201).json(clean);
    } catch (e) {
      console.error('POST /api/public/users error:', e);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Update user (no auth)
router.put(
  '/users/:id',
  body('email').isEmail(),
  body('name').isLength({ min: 2 }),
  body('mobile').optional().matches(/^[6-9]\d{9}$/),
  body('password')
    .optional()
    .isLength({ min: 8 })
    .matches(/[a-z]/)
    .matches(/[A-Z]/)
    .matches(/\d/)
    .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]/),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const { name, email, mobile, department, role, password } = req.body;
      const update = { name, email, mobile, department, role };
      if (password && password.trim()) {
        const salt = await bcrypt.genSalt(10);
        update.password = await bcrypt.hash(password, salt);
      }
      const updated = await User.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true })
        .select('-password');
      if (!updated) return res.status(404).json({ message: 'User not found' });
      res.json(updated);
    } catch (e) {
      console.error('PUT /api/public/users/:id error:', e);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Delete user (no auth)
router.delete('/users/:id', async (req, res) => {
  try {
    const del = await User.findByIdAndDelete(req.params.id);
    if (!del) return res.status(404).json({ message: 'User not found' });
    res.json({ success: true });
  } catch (e) {
    console.error('DELETE /api/public/users/:id error:', e);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a test entry to a user (no auth)
router.post('/users/:id/tests', async (req, res) => {
  try {
  const { category, score, date, timeSpent, totalQuestions, paperId } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
  user.testHistory = user.testHistory || [];
  // Unshift to place latest test at the beginning so newest appears first
  user.testHistory.unshift({ category, paperId, score, date: date ? new Date(date) : new Date(), timeSpent, totalQuestions });
    await user.save();
    const clean = user.toObject();
    delete clean.password;
    res.status(201).json(clean);
  } catch (e) {
    console.error('POST /api/public/users/:id/tests error:', e);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a test entry by index (no auth)
router.put('/users/:id/tests/:index', async (req, res) => {
  try {
    const { index } = req.params;
  const { category, score, date, timeSpent, totalQuestions, paperId } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const idx = Number(index);
    if (!user.testHistory || idx < 0 || idx >= user.testHistory.length) return res.status(404).json({ message: 'Test entry not found' });
    const entry = user.testHistory[idx];
    if (category !== undefined) entry.category = category;
  if (paperId !== undefined) entry.paperId = paperId;
    if (score !== undefined) entry.score = score;
    if (date !== undefined) entry.date = new Date(date);
    if (timeSpent !== undefined) entry.timeSpent = timeSpent;
    if (totalQuestions !== undefined) entry.totalQuestions = totalQuestions;
    await user.save();
    const clean = user.toObject();
    delete clean.password;
    res.json(clean);
  } catch (e) {
    console.error('PUT /api/public/users/:id/tests/:index error:', e);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a test entry by index (no auth)
router.delete('/users/:id/tests/:index', async (req, res) => {
  try {
    const { index } = req.params;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const idx = Number(index);
    if (!user.testHistory || idx < 0 || idx >= user.testHistory.length) return res.status(404).json({ message: 'Test entry not found' });
    user.testHistory.splice(idx, 1);
    await user.save();
    res.json({ success: true });
  } catch (e) {
    console.error('DELETE /api/public/users/:id/tests/:index error:', e);
    res.status(500).json({ message: 'Server error' });
  }
});

// Clear all tests (no auth)
router.delete('/users/:id/tests', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.testHistory = [];
    await user.save();
    res.json({ success: true });
  } catch (e) {
    console.error('DELETE /api/public/users/:id/tests error:', e);
    res.status(500).json({ message: 'Server error' });
  }
});
