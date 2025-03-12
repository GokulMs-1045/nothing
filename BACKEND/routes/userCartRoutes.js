const express = require('express');

const router = express.Router();
const  {addToCart, deleteCart, getCart}  = require('../controllers/userCart/userCart');

router.post('/:googleId/:productName/cart', addToCart);
router.get('/:googleId/:productName/cart',getCart);
router.delete('/:googleId/:productName/cart/delete',deleteCart);

module.exports = router;
