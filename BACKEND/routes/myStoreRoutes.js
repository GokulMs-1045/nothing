const express = require('express');
const { getDealerByGoogleId,updateDealerByGoogleId} = require('../controllers/myStore/mystore.js');

const router = express.Router();

// ✅ Route to get store details
router.get('/myStore/:googleId', getDealerByGoogleId );

// ✅ Route to update store details
router.put('/myStore/:googleId/edit', updateDealerByGoogleId);

// const { addProduct, getProductsByGoogleid } = require("../controllers/myStore/storeProducts");

// router.post("/products/:phoneNumber", addProduct);
// router.get("/products/:phoneNumber", getProductsByGoogleid);

module.exports = router;
