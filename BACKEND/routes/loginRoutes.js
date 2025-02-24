const express = require('express');
const loginUser  = require('../controllers/login/login');

const router = express.Router();

router.post('/login', loginUser);   

module.exports = router;