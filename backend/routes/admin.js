import express from 'express';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Admin guard - requires authenticated user and Admin role
async function requireAdmin(req, res, next) {
  try {
    if (!req.user?.id) return res.status(401).json({ message: 'Unauthorized' });
    const me = await User.findById(req.user.id).select('role');
    if (!me || me.role !== 'Admin') return res.status(403).json({ message: 'Forbidden' });
    next();
  } catch (e) {
    console.error('requireAdmin error:', e);
    res.status(500).json({ message: 'Server error' });
  }
}

// GET /api/admin/users - list with filters & pagination
router.get('/users', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { q = '', role = '', department = '', page = 1, limit = 20 } = req.query;
    const filters = { role: { $ne: 'Admin' } }; // Exclude Admin users from dashboard
    if (role && role !== 'Admin') filters.role = role; // Allow filtering by role, but never show Admins
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

    // augment stats client-side if desired
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
    console.error('GET /api/admin/users error:', e);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/admin/users/:id
router.get('/users/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .lean();
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (e) {
    console.error('GET /api/admin/users/:id error:', e);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/admin/users - create user
router.post(
  '/users',
  verifyToken,
  requireAdmin,
  body('email').isEmail(),
  body('name').isLength({ min: 2 }),
  body('password')
    .isLength({ min: 8 })
    .matches(/[a-z]/)
    .matches(/[A-Z]/)
    .matches(/\d/)
    .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/),
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
      
        // Log admin action
        const adminUser = await User.findById(req.user.id).select('name email');
        console.log(`[ADMIN ACTION] User created by ${adminUser?.name} (${adminUser?.email}) - New user: ${name} (${email})`);
      
      const clean = user.toObject();
      delete clean.password;
      res.status(201).json(clean);
    } catch (e) {
      console.error('POST /api/admin/users error:', e);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// PUT /api/admin/users/:id - update fields; optional password reset
router.put(
  '/users/:id',
  verifyToken,
  requireAdmin,
  body('email').isEmail(),
  body('name').isLength({ min: 2 }),
  body('mobile').optional().matches(/^[6-9]\d{9}$/),
  body('password')
    .optional()
    .isLength({ min: 8 })
    .matches(/[a-z]/)
    .matches(/[A-Z]/)
    .matches(/\d/)
    .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/),
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
      
        // Log admin action
        const adminUser = await User.findById(req.user.id).select('name email');
        console.log(`[ADMIN ACTION] User updated by ${adminUser?.name} (${adminUser?.email}) - Updated user: ${updated.name} (${updated.email})`);
      
      res.json(updated);
    } catch (e) {
      console.error('PUT /api/admin/users/:id error:', e);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// DELETE /api/admin/users/:id
router.delete('/users/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const del = await User.findByIdAndDelete(req.params.id);
    if (!del) return res.status(404).json({ message: 'User not found' });
    
    // Log admin action
    const adminUser = await User.findById(req.user.id).select('name email');
    console.log(`[ADMIN ACTION] User deleted by ${adminUser?.name} (${adminUser?.email}) - Deleted user: ${del.name} (${del.email})`);
    
    res.json({ success: true });
  } catch (e) {
    console.error('DELETE /api/admin/users/:id error:', e);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
