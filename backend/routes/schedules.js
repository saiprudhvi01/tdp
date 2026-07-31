const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));
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
    const schedules = await Schedule.find().lean();
    schedules.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new schedule (admin only)
router.post('/', upload.fields([
  { name: 'primaryImage', maxCount: 1 },
  { name: 'coverBanner', maxCount: 1 },
  { name: 'gallery', maxCount: 10 },
  { name: 'videos', maxCount: 5 }
]), async (req, res) => {
  try {
    const { title, description, date, location, village, mandal, isPermanent, status, content } = req.body;
    const files = req.files || {};

    const scheduleData = {
      title,
      description,
      date: new Date(date),
      location,
      village,
      mandal,
      isPermanent: isPermanent === 'true',
      status: status || 'upcoming',
      content: content || ''
    };

    if (files.primaryImage) {
      scheduleData.primaryImage = files.primaryImage[0].filename;
    }
    if (files.coverBanner) {
      scheduleData.coverBanner = files.coverBanner[0].filename;
    }
    if (files.gallery) {
      scheduleData.gallery = files.gallery.map(file => file.filename);
    }
    if (files.videos) {
      scheduleData.videos = files.videos.map(file => file.filename);
    }

    const schedule = await Schedule.create(scheduleData);

    res.json(schedule);
  } catch (error) {
    console.error('Schedule create error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get schedule by ID
router.get('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id).lean();
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update schedule (admin only)
router.put('/:id', upload.fields([
  { name: 'primaryImage', maxCount: 1 },
  { name: 'coverBanner', maxCount: 1 },
  { name: 'gallery', maxCount: 10 },
  { name: 'videos', maxCount: 5 }
]), async (req, res) => {
  try {
    const { title, description, date, location, village, mandal, isPermanent, status, content } = req.body;
    const files = req.files || {};

    const updates = {};
    if (title) updates.title = title;
    if (description) updates.description = description;
    if (date) updates.date = new Date(date);
    if (location) updates.location = location;
    if (village) updates.village = village;
    if (mandal) updates.mandal = mandal;
    if (isPermanent !== undefined) updates.isPermanent = isPermanent === 'true';
    if (status) updates.status = status;
    if (content !== undefined) updates.content = content;

    if (files.primaryImage) updates.primaryImage = files.primaryImage[0].filename;
    if (files.coverBanner) updates.coverBanner = files.coverBanner[0].filename;
    if (files.gallery) updates.gallery = files.gallery.map(file => file.filename);
    if (files.videos) updates.videos = files.videos.map(file => file.filename);

    const schedule = await Schedule.findByIdAndUpdate(req.params.id, updates, { new: true }).lean();
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete schedule (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Schedule.findByIdAndDelete(req.params.id);
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
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const schedule = await Schedule.findByIdAndUpdate(req.params.id, { status }, { new: true }).lean();
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add content to schedule after completion (admin only)
router.patch('/:id/content', upload.fields([
  { name: 'gallery', maxCount: 10 },
  { name: 'videos', maxCount: 5 }
]), async (req, res) => {
  try {
    const existingSchedule = await Schedule.findById(req.params.id).lean();
    if (!existingSchedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    const updates = {};
    const { content } = req.body;
    if (content) updates.content = content;
    
    const files = req.files || {};
    if (files.gallery) {
      const newGallery = files.gallery.map(file => file.filename);
      updates.gallery = [...(existingSchedule.gallery || []), ...newGallery];
    }
    if (files.videos) {
      const newVideos = files.videos.map(file => file.filename);
      updates.videos = [...(existingSchedule.videos || []), ...newVideos];
    }

    const schedule = await Schedule.findByIdAndUpdate(req.params.id, updates, { new: true }).lean();
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
