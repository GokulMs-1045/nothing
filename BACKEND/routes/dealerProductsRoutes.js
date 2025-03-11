const express = require('express');

const {addProduct,updateProduct, deleteProduct, getProductsByGoogleId} =require ("../controllers/myStore/storeProducts.js")

const router = express.Router();

router.post('/myStore/:googleId/addProduct', addProduct);
router.get("/myStore/:googleId/getProduct", getProductsByGoogleId );
router.put("/myStore/:googleId/:productName/updateProduct",updateProduct );
router.delete("/myStore/:googleId/:productName/deleteProduct", deleteProduct );

module.exports = router;