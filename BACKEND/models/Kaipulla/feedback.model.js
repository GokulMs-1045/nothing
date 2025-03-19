const mongoose = require('mongoose');
const { Kaipulla} = require('../../config/db.js');

const feedbackSchema = new mongoose.Schema({
  feedbackText: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = Kaipulla.model('feedBack', feedbackSchema);