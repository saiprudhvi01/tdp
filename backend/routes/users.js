const express = require('express');
const router = express.Router();
const db = require('../data/database');
const auth = require('../middleware/auth');

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await db.findById('users', req.userId);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user complaints
router.get('/complaints', auth, async (req, res) => {
  try {
    const complaints = await db.find('complaints', { userId: req.userId });
    complaints.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
