const express = require('express');
const router = express.Router();
const db = require('../data/database');
const auth = require('../middleware/auth');

// Get dashboard stats
router.get('/dashboard', auth, async (req, res) => {
  try {
    const schedules = await db.find('schedules');
    const totalSchedules = schedules.length;
    const completedSchedules = schedules.filter(s => s.status === 'completed').length;
    
    const complaints = await db.find('complaints');
    const pendingComplaints = complaints.filter(c => c.status === 'pending').length;
    
    const users = await db.find('users');
    const totalUsers = users.length;

    res.json({
      totalSchedules,
      completedSchedules,
      pendingComplaints,
      totalUsers
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all complaints
router.get('/complaints', auth, async (req, res) => {
  try {
    const complaints = await db.find('complaints');
    complaints.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update complaint status
router.put('/complaints/:id', auth, async (req, res) => {
  try {
    const { status, adminResponse } = req.body;
    const complaint = await db.updateById('complaints', req.params.id, {
      status,
      adminResponse,
      updatedAt: new Date().toISOString()
    });
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
