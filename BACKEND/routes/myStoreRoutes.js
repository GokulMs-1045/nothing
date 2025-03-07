const express = require('express');
const { getStore, editStore } = require('../controllers/myStore/mystore');

const router = express.Router();

// ✅ Route to get store details
router.get('/myStore/:name', getStore);

// ✅ Route to update store details
router.put('/myStore/edit/:oldName', editStore);
  
module.exports = router;
