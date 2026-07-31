require('dotenv').config();
const mongoose = require('mongoose');
const Schedule = require('./models/Schedule');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  try {
    const s = await Schedule.create({
      title: "Test",
      description: "Desc",
      date: undefined,
      time: "10:00 AM"
    });
    console.log("Success:", s);
  } catch (e) {
    console.error("Error:", e.message);
  }
  process.exit();
});
