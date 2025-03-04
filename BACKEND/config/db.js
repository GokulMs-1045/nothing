require('dotenv').config();
const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));



module.exports = mongoose