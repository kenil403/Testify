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
const FRONTEND_URL = process.env.FRONTEND_URL || '*';
app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

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
