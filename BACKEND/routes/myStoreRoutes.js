const express = require('express');
const { getDealerByGoogleId,updateDealerByGoogleId} = require('../controllers/myStore/mystore.js');
const {addProduct,updateProduct, deleteProduct, getProductsByGoogleId} =require ("../controllers/myStore/storeProducts.js");

const router = express.Router();

// ✅ Route to get store details
router.get('/myStore/:googleId', getDealerByGoogleId );

// ✅ Route to update store details
router.put('/myStore/:googleId/edit', updateDealerByGoogleId);


router.post('/myStore/:googleId/addProduct', addProduct);
router.get("/myStore/:googleId/getProduct", getProductsByGoogleId );
router.put("/myStore/:googleId/:productName/updateProduct",updateProduct );
router.delete("/myStore/:googleId/:productName/deleteProduct", deleteProduct );


module.exports = router;
