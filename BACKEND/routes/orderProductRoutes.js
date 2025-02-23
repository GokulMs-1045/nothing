const express = require('express');
const { orderProduct } = require('../controllers/orderProduct/orderProduct');

const router = express.Router();

router.post('/', orderProduct);

module.exports = router;
