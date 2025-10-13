import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import connectDB from './db.js';
import authRouter from './routes/auth.js';
import testsRouter from './routes/tests.js';
import verifyToken from './middleware/auth.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Allow CORS from frontend URL if provided, otherwise default to allow all origins during dev
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5174';
app.use(cors({ 
  origin: [FRONTEND_URL, 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Handle preflight requests for all routes
app.options('*', cors());

// Request logging middleware for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - Origin: ${req.headers.origin || 'none'}`);
  next();
});

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Example protected route (JWT auth placeholder)
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: 'Protected data', user: req.user });
});

// Add more routes here

// Connect to MongoDB
connectDB();

// Auth routes
app.use('/api/auth', authRouter);
// Tests routes
app.use('/api/tests', testsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
