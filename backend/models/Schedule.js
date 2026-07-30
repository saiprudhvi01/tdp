const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  village: {
    type: String
  },
  mandal: {
    type: String
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
  }],
  content: {
    type: String
  },
  isPermanent: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['upcoming', 'completed', 'ongoing', 'cancelled'],
    default: 'upcoming'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date
  }
});

// Auto-set expiration date if not permanent
scheduleSchema.pre('save', function(next) {
  if (!this.isPermanent && !this.expiresAt) {
    const expirationDate = new Date(this.createdAt);
    expirationDate.setDate(expirationDate.getDate() + 30);
    this.expiresAt = expirationDate;
  }
  next();
});

module.exports = mongoose.model('Schedule', scheduleSchema);
