const express = require('express');
const { getStore, editStore } = require('../controllers/myStore/mystore');

const router = express.Router();

// ✅ Route to get store details
router.get('/myStore/:googleid', getStore);

// ✅ Route to update store details
router.put('/myStore/:googleid/edit', editStore);

const { addProduct, getProductsByGoogleid } = require("../controllers/myStore/storeProducts");

router.post("/products/:phoneNumber", addProduct);
router.get("/products/:phoneNumber", getProductsByGoogleid);

module.exports = router;
