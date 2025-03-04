const express = require('express');
const adminreqOrders  = require('../controllers/adminReq');

const router = express.Router();

router.get('/user/:id', adminreqOrders);

module.exports = router;