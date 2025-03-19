const mongoose = require('mongoose');
const { Kaipulla } = require('../../config/db');

const bugReportSchema = new mongoose.Schema({
  bugPage: {
    type: String,
    required: true,
    enum: ['Dashboard', 'Products', 'Cart', 'Other'], // Adjust pages as needed
    default: 'Dashboard',
  },
  priority: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High'],
    default: 'Low',
  },
  labelName: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String, // Store the path or URL of the uploaded image 
    required:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = Kaipulla.model('bugs', bugReportSchema, 'Bugs');