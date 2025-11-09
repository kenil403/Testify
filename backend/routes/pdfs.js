import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { isDbConnected } from '../db.js';
import LearningResources from '../models/Learning_Resources.js';

const router = express.Router();

function exactRegex(term) {
  const esc = String(term).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^${esc}$`, 'i');
}

function buildQuery(section, subsection) {
  const query = {};
  if (section) {
    const aliases = new Set([section]);
    if (/^aptitude$/i.test(section) || /^apptitude$/i.test(section)) {
      aliases.add('Aptitude');
      aliases.add('Apptitude');
    }
    query.section = { $in: Array.from(aliases).map(exactRegex) };
  }
  if (subsection) {
    const aliases = new Set([subsection]);
    if (/problems?\s+on\s+trains/i.test(subsection)) {
      aliases.add('Problems on Trains');
      aliases.add('Problem on Trains');
    }
    query.subsection = { $in: Array.from(aliases).map(exactRegex) };
  }
  return query;
}

// Middleware: verify token from Authorization header or `token` query param (for anchor/link usage)
function verifyTokenFlexible(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1];
    if (!token && req.query && req.query.token) token = req.query.token;
    if (!token) return res.status(401).json({ message: 'No token provided' });
    jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      req.user = decoded;
      next();
    });
  } catch (e) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

// GET /api/pdfs?section=Apptitude&subsection=Problems%20on%20Trains
router.get('/', verifyTokenFlexible, async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.status(200).json({ items: [] });
    }
    const { section, subsection } = req.query;
    const query = buildQuery(section, subsection);
    const docs = await LearningResources.find(query)
      .sort({ createdAt: -1 })
      .select('_id title section subsection size contentType fileName createdAt updatedAt');

    res.json({
      items: docs.map(d => ({
        id: d._id,
        title: d.title,
        section: d.section,
        subsection: d.subsection,
        size: d.size ?? (d.data ? d.data.length : null),
        contentType: d.contentType || 'application/pdf',
        fileName: d.fileName || undefined,
        createdAt: d.createdAt,
        updatedAt: d.updatedAt
      }))
    });
  } catch (err) {
    console.error('GET /api/pdfs error:', err && err.message ? err.message : err);
    res.status(500).json({ message: 'Server error', items: [] });
  }
});

// GET /api/pdfs/:id/view (inline)
router.get('/:id/view', verifyTokenFlexible, async (req, res) => {
  try {
    if (!isDbConnected()) return res.status(503).json({ message: 'Database unavailable' });
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }
    const doc = await LearningResources.findById(id).select('title contentType data fileName');
    if (!doc) return res.status(404).json({ message: 'PDF not found' });
    if (!doc.data) return res.status(410).json({ message: 'PDF data missing' });
    const fname = doc.fileName || `${doc.title || 'document'}.pdf`;
    res.setHeader('Content-Type', doc.contentType || 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(fname)}"`);
    res.end(doc.data);
  } catch (err) {
    console.error('GET /api/pdfs/:id/view error:', err && err.message ? err.message : err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/pdfs/:id/download (attachment)
router.get('/:id/download', verifyTokenFlexible, async (req, res) => {
  try {
    if (!isDbConnected()) return res.status(503).json({ message: 'Database unavailable' });
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }
    const doc = await LearningResources.findById(id).select('title contentType data fileName');
    if (!doc) return res.status(404).json({ message: 'PDF not found' });
    if (!doc.data) return res.status(410).json({ message: 'PDF data missing' });
    const fname = doc.fileName || `${doc.title || 'document'}.pdf`;
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(fname)}"`);
    res.end(doc.data);
  } catch (err) {
    console.error('GET /api/pdfs/:id/download error:', err && err.message ? err.message : err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
