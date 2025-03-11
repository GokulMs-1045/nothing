const express = require('express');
const { getDealerByGoogleId, updateStoreDetails} = require('../controllers/myStore/mystore.js');;

const router = express.Router();

// ✅ Route to get store details
router.get('/myStore/:googleId', getDealerByGoogleId );

// ✅ Route to update store details
router.put('/myStore/:googleId/edit', updateStoreDetails);



module.exports = router;
