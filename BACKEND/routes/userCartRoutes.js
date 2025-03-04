const express = require('express');
const router = express.Router();
const  userCart  = require('../controllers/userCart/userCart');

router.post('/cart', userCart);

module.exports = router;
