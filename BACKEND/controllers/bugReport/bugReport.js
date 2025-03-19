const bugs = require('../../models/Kaipulla/bugReport.model');

// Create a new bug report
const createBugReport = async (req, res) => {
  try {
    const { bugPage, priority, labelName, imageUrl } = req.body;
    // Adjust based on your auth system

    // Validate required fields
    if (!bugPage || !priority || !labelName) {
      return res.status(400).json({ message: 'bugPage, priority, and labelName are required' });
    }

    // Create bug report data
    const bugReportData = {
      bugPage,
      priority,
      labelName,
      imageUrl,
      
    };

    const newBugReport = new bugs(bugReportData);
    await newBugReport.save();

    return res.status(201).json({ message: 'Bug report created successfully', bugs: newBugReport });
  } catch (error) {
    console.error('Create bug report error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createBugReport };