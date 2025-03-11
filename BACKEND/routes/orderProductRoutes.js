const express = require('express');
const { createOrderbyId } = require('../controllers/order/order.js');

const router = express.Router();

// Single route for creating an order
router.post('/:googleId/:productName/order', createOrderbyId);

module.exports = router;