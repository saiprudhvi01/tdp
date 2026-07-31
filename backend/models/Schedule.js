const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date
  },
  time: {
    type: String
  },
  location: {
    type: String
  },
  village: {
    type: String
  },
  mandal: {
    type: String
  },
  category: {
    type: String,
    default: 'Event'
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled', 'pending'],
    default: 'upcoming'
  },
  content: {
    type: String
  },
  isPermanent: {
    type: Boolean,
    default: false
  },
  primaryImage: {
    type: String
  },
  coverBanner: {
    type: String
  },
  gallery: [{
    type: String
  }],
  videos: [{
    type: String
  }]
}, {
  timestamps: true // Automatically manages createdAt and updatedAt
});

module.exports = mongoose.model('Schedule', scheduleSchema);
