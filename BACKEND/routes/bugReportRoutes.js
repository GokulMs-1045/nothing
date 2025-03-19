const express = require('express');
const router = express.Router();
const { createBugReport } = require('../controllers/bugReport/bugReport');
const { createContact } = require('../controllers/bugReport/contactUs');
const { createFeedback } = require('../controllers/bugReport/feedBack');

router.post('/bug-reports', createBugReport);
router.post('/contact/:googleId', createContact);
router.post('/feedback', createFeedback);

module.exports = router;