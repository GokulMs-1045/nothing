const express = require('express');
const { getProducts } = require('../controllers/homeProducts/homeProducts.js');

const router = express.Router();
router.get('/products/',getProducts)

module.exports = router;