import mongoose from 'mongoose';
import { Dealer } from '../../config/db.js';

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  returnPolicy: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Electronics', 'Clothing', 'Groceries', 'Books', 'Furniture'],
    default: 'Miscellaneous'
  },
  googleId: { type: String, required: true }, // Reference to the dealer's googleId
  instock: { type: Number, required: true }, // Optional field
});

const Product = Dealer.model('Products', productSchema,'products');

export default Product;