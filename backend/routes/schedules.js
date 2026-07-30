const express = require('express');
const router = express.Router();
const db = require('../data/database');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit for videos
  fileFilter: (req, file, cb) => {
    const allowedImages = /jpeg|jpg|png|gif|webp/;
    const allowedVideos = /mp4|mov|avi|webm/;
    const extname = allowedImages.test(path.extname(file.originalname).toLowerCase()) || 
                    allowedVideos.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedImages.test(file.mimetype) || allowedVideos.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Images and videos only!'));
  }
});

// Get all schedules (public)
router.get('/', async (req, res) => {
  try {
    const schedules = await db.find('schedules', { status: 'completed' });
    schedules.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new schedule (admin only)
router.post('/', auth, upload.fields([
  { name: 'primaryImage', maxCount: 1 },
  { name: 'coverBanner', maxCount: 1 },
  { name: 'gallery', maxCount: 10 },
  { name: 'videos', maxCount: 5 }
]), async (req, res) => {
  try {
    const { title, description, date, location, village, mandal, isPermanent, status, content } = req.body;

    const scheduleData = {
      title,
      description,
      date: new Date(date).toISOString(),
      location,
      village,
      mandal,
      isPermanent: isPermanent === 'true',
      status: status || 'upcoming',
      content: content || ''
    };

    if (req.files.primaryImage) {
      scheduleData.primaryImage = req.files.primaryImage[0].filename;
    }
    if (req.files.coverBanner) {
      scheduleData.coverBanner = req.files.coverBanner[0].filename;
    }
    if (req.files.gallery) {
      scheduleData.gallery = req.files.gallery.map(file => file.filename);
    }
    if (req.files.videos) {
      scheduleData.videos = req.files.videos.map(file => file.filename);
    }

    const schedule = await db.create('schedules', scheduleData);

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get schedule by ID
router.get('/:id', async (req, res) => {
  try {
    const schedule = await db.findById('schedules', req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update schedule (admin only)
router.put('/:id', auth, upload.fields([
  { name: 'primaryImage', maxCount: 1 },
  { name: 'coverBanner', maxCount: 1 },
  { name: 'gallery', maxCount: 10 },
  { name: 'videos', maxCount: 5 }
]), async (req, res) => {
  try {
    const { title, description, date, location, village, mandal, isPermanent, status, content } = req.body;

    const updates = {};
    if (title) updates.title = title;
    if (description) updates.description = description;
    if (date) updates.date = new Date(date).toISOString();
    if (location) updates.location = location;
    if (village) updates.village = village;
    if (mandal) updates.mandal = mandal;
    if (isPermanent !== undefined) updates.isPermanent = isPermanent === 'true';
    if (status) updates.status = status;
    if (content !== undefined) updates.content = content;

    if (req.files.primaryImage) {
      updates.primaryImage = req.files.primaryImage[0].filename;
    }
    if (req.files.coverBanner) {
      updates.coverBanner = req.files.coverBanner[0].filename;
    }
    if (req.files.gallery) {
      updates.gallery = req.files.gallery.map(file => file.filename);
    }
    if (req.files.videos) {
      updates.videos = req.files.videos.map(file => file.filename);
    }

    const schedule = await db.updateById('schedules', req.params.id, updates);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete schedule (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await db.deleteById('schedules', req.params.id);
    if (deleted) {
      res.json({ message: 'Schedule deleted' });
    } else {
      res.status(404).json({ message: 'Schedule not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update schedule status (admin only)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const schedule = await db.updateById('schedules', req.params.id, { status });
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add content to schedule after completion (admin only)
router.patch('/:id/content', auth, upload.fields([
  { name: 'gallery', maxCount: 10 },
  { name: 'videos', maxCount: 5 }
]), async (req, res) => {
  try {
    const existingSchedule = await db.findById('schedules', req.params.id);
    if (!existingSchedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    const updates = {};
    const { content } = req.body;
    if (content) updates.content = content;
    
    if (req.files.gallery) {
      const newGallery = req.files.gallery.map(file => file.filename);
      updates.gallery = [...(existingSchedule.gallery || []), ...newGallery];
    }
    if (req.files.videos) {
      const newVideos = req.files.videos.map(file => file.filename);
      updates.videos = [...(existingSchedule.videos || []), ...newVideos];
    }

    const schedule = await db.updateById('schedules', req.params.id, updates);
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
