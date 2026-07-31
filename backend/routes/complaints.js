const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// Create new complaint
router.post('/', async (req, res) => {
  try {
    const { subject, description, category, village, userName, userId } = req.body;

    const complaint = await Complaint.create({
      userId: userId || 'user1',
      userName: userName || 'User',
      subject,
      description,
      category,
      village,
      status: 'pending',
      response: '',
      respondedAt: ''
    });

    res.json(complaint);
  } catch (error) {
    console.error('Error creating complaint:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().lean();
    complaints.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(complaints);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update complaint status / response (Admin)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await Complaint.findByIdAndUpdate(id, updates, { new: true }).lean();
    if (!updated) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.json(updated);
  } catch (error) {
    console.error('Error updating complaint:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete complaint (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Complaint.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting complaint:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
