const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../data/database');

// User Login
router.post('/user/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await db.findOne('users', { email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: 'user', userName: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        village: user.village,
        mandal: user.mandal
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// User Register
router.post('/user/register', async (req, res) => {
  try {
    const { name, email, phone, password, village, mandal } = req.body;

    const existingUser = await db.findOne('users', { email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await db.create('users', {
      name,
      email,
      phone,
      password,
      village,
      mandal
    });

    const token = jwt.sign(
      { userId: user._id, role: 'user', userName: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        village: user.village,
        mandal: user.mandal
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin Login
router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const admin = await db.findOne('admins', { username });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (password !== admin.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { adminId: admin._id, role: 'admin', userName: admin.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        username: admin.username
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
