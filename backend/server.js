const express = require('express');
const cors = require('cors');
const path = require('path');
const localDb = require('./data/database');
const connectDB = require('./config/db');
const Schedule = require('./models/Schedule');
const Complaint = require('./models/Complaint');
require('dotenv').config();

const app = express();

// Connect to MongoDB and run auto-migration
connectDB().then(async (isConnected) => {
  if (!isConnected) {
    console.log('Falling back to local database...');
    localDb.initDB().then(() => console.log('Local database initialized'));
    return;
  }
  
  try {
    const schedulesCount = await Schedule.countDocuments();
    if (schedulesCount === 0) {
      console.log('Migrating schedules from JSON to MongoDB...');
      const jsonSchedules = await localDb.readFile('schedules');
      if (jsonSchedules && jsonSchedules.length > 0) {
        const docs = jsonSchedules.map(s => {
          const { _id, ...rest } = s;
          if (rest.date) rest.date = new Date(rest.date);
          return rest;
        });
        await Schedule.insertMany(docs);
        console.log(`✅ Migrated ${docs.length} schedules to MongoDB.`);
      }
    }

    const complaintsCount = await Complaint.countDocuments();
    if (complaintsCount === 0) {
      console.log('Migrating complaints from JSON to MongoDB...');
      const jsonComplaints = await localDb.readFile('complaints');
      if (jsonComplaints && jsonComplaints.length > 0) {
        const docs = jsonComplaints.map(c => {
          const { _id, ...rest } = c;
          return rest;
        });
        await Complaint.insertMany(docs);
        console.log(`✅ Migrated ${docs.length} complaints to MongoDB.`);
      }
    }
  } catch (err) {
    console.error('❌ Auto-migration failed:', err);
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve frontend static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  });
}

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/schedules', require('./routes/schedules'));
app.use('/api/complaints', require('./routes/complaints'));
app.use('/api/statuses', require('./routes/statuses'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
