const express = require('express');
const router = express.Router();
const db = require('../data/database');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configure multer storage for media uploads (images and videos)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'status-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit for status videos
  fileFilter: (req, file, cb) => {
    const allowedImages = /jpeg|jpg|png|gif|webp/;
    const allowedVideos = /mp4|mov|avi|webm|mkv/;
    const extname = allowedImages.test(path.extname(file.originalname).toLowerCase()) || 
                    allowedVideos.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedImages.test(file.mimetype) || allowedVideos.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only images and videos are allowed!'));
  }
});

// GET all statuses (Public/User/Admin)
router.get('/', async (req, res) => {
  try {
    const statuses = await db.find('statuses');
    statuses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(statuses);
  } catch (error) {
    console.error('Error fetching statuses:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single status by ID
router.get('/:id', async (req, res) => {
  try {
    const status = await db.findById('statuses', req.params.id);
    if (!status) {
      return res.status(404).json({ message: 'Status not found' });
    }
    res.json(status);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST create status (Admin only)
router.post('/', auth, upload.single('media'), async (req, res) => {
  try {
    const { title, content, type } = req.body;

    const statusData = {
      title: title || '',
      content: content || '',
      type: type || (req.file ? (req.file.mimetype.startsWith('video') ? 'video' : 'image') : 'text'),
      media: req.file ? req.file.filename : null,
      mediaUrl: req.file ? `/uploads/${req.file.filename}` : null
    };

    const newStatus = await db.create('statuses', statusData);
    res.status(201).json(newStatus);
  } catch (error) {
    console.error('Error creating status:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// PUT update status (Admin only)
router.put('/:id', auth, upload.single('media'), async (req, res) => {
  try {
    const existing = await db.findById('statuses', req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'Status not found' });
    }

    const { title, content, type } = req.body;
    const updates = {};

    if (title !== undefined) updates.title = title;
    if (content !== undefined) updates.content = content;
    if (type !== undefined) updates.type = type;

    if (req.file) {
      updates.media = req.file.filename;
      updates.mediaUrl = `/uploads/${req.file.filename}`;
    }

    const updatedStatus = await db.updateById('statuses', req.params.id, updates);
    res.json(updatedStatus);
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// DELETE status (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await db.deleteById('statuses', req.params.id);
    if (deleted) {
      res.json({ message: 'Status deleted successfully' });
    } else {
      res.status(404).json({ message: 'Status not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
