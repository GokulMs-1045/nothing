import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  instock: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  returnPolicy:{type:String,required:true,min:1},
  googleId: { type: String, required: true } // Links to the dealer's googleId
});


const Product = (conn) => conn.model('Product', productSchema, 'Products');

export default Product;