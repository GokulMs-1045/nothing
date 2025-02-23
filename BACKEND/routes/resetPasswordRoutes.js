const express = require('express');

const resetpassword = require('../controllers/resetpassword/resetpassword');

const router = express.Router();

router.post('/', resetpassword);

module.exports = router;