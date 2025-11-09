import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import authRouter from './routes/auth.js';
import testsRouter from './routes/tests.js';
import pdfsRouter from './routes/pdfs.js';
import papersRouter from './routes/papers.js';
import adminRouter from './routes/admin.js';
import publicRouter from './routes/public.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Allow CORS from frontend URL if provided, otherwise allow common local dev ports
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const corsOptions = {
  origin: [FRONTEND_URL, 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Pragma', 'Expires', 'X-Requested-With']
};
app.use(cors(corsOptions));
app.use(express.json());

// Handle preflight requests for all routes with the same options
app.options('*', cors(corsOptions));

// Request logging middleware for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - Origin: ${req.headers.origin || 'none'}`);
  next();
});

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// (Removed example protected route)

// Add more routes here

// Connect to MongoDB
connectDB();

// Auth routes
app.use('/api/auth', authRouter);
// Tests routes
app.use('/api/tests', testsRouter);
// PDFs routes (Problem on Trains pilot)
app.use('/api/pdfs', pdfsRouter);
// Papers routes (Aptitude papers, etc.)
app.use('/api/papers', papersRouter);
// Admin routes (secured)
app.use('/api/admin', adminRouter);
// Public read-only routes (no auth)
app.use('/api/public', publicRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
