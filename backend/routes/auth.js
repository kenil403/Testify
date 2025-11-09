import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Register
router.post('/register',
  // validation
  body('email').isEmail().withMessage('Valid email required'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/).withMessage('Password must contain at least one special character'),
  body('name').optional().isLength({ min: 2 }).withMessage('Name too short'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { name, email, password, mobile, department, role } = req.body;

      const existing = await User.findOne({ email });
      if (existing) return res.status(409).json({ message: 'User already exists' });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      // Accept role from request, default to 'Student' if not provided
      const userRole = role && ['Student', 'Admin'].includes(role) ? role : 'Student';
      
      // Build user object conditionally: only include department for Student role
      const userData = { name, email, password: hash, mobile, role: userRole };
      if (userRole === 'Student' && department) {
        userData.department = department;
      }
      
      const user = new User(userData);
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

// Configure nodemailer (using Gmail as example - in production use proper email service)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Current user (validate token and fetch from DB)
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    console.error('GET /api/auth/me error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Profile
router.put('/update-profile',
  verifyToken,
  // validation
  body('email').isEmail().withMessage('Valid email required'),
  body('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  body('password').optional()
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/).withMessage('Password must contain at least one special character'),
  body('mobile').optional().matches(/^[6-9]\d{9}$/).withMessage('Please enter a valid 10-digit mobile number'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { name, email, password, mobile, department } = req.body;
      const userId = req.user.id;

      // Check if email is already taken by another user
      const existingUser = await User.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        return res.status(409).json({ message: 'Email is already taken by another user' });
      }

      // Find the current user
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Prepare update data
      const updateData = {
        name,
        email,
        mobile,
        department
      };

      // Hash new password if provided
      if (password && password.trim()) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(password, salt);
      }

      // Update user in database
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, runValidators: true }
      ).select('-password'); // Exclude password from response

      res.json({ 
        message: 'Profile updated successfully',
        user: updatedUser
      });

    } catch (err) {
      console.error('Profile update error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
