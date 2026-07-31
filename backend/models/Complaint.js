const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'other'
  },
  village: {
    type: String
  },
  userId: {
    type: String
  },
  userName: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved', 'rejected'],
    default: 'pending'
  },
  response: {
    type: String
  },
  respondedAt: {
    type: String
  },
  isPermanent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Automatically manages createdAt and updatedAt
});

module.exports = mongoose.model('Complaint', complaintSchema);
