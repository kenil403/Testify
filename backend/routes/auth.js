import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Register
router.post('/register',
  // validation
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars'),
  body('name').optional().isLength({ min: 2 }).withMessage('Name too short'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { name, email, password, mobile, role, department } = req.body;

      const existing = await User.findOne({ email });
      if (existing) return res.status(409).json({ message: 'User already exists' });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const user = new User({ name, email, password: hash, mobile, role, department });
      await user.save();

      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

      res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name, mobile: user.mobile, role: user.role, department: user.department } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Login
router.post('/login',
  body('email').isEmail().withMessage('Valid email required'),
  body('password').exists().withMessage('Password required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

      res.json({ token, user: { id: user._id, email: user.email, name: user.name, mobile: user.mobile, role: user.role, department: user.department } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
