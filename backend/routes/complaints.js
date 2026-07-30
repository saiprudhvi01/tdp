const express = require('express');
const router = express.Router();
const db = require('../data/database');
const auth = require('../middleware/auth');

// Create new complaint
router.post('/', auth, async (req, res) => {
  try {
    const { subject, description, category, village } = req.body;

    const complaint = await db.create('complaints', {
      userId: req.userId,
      userName: req.userName || 'User',
      subject,
      description,
      category,
      village,
      status: 'pending'
    });

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all complaints (public - for demo)
router.get('/', async (req, res) => {
  try {
    const complaints = await db.find('complaints');
    complaints.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
