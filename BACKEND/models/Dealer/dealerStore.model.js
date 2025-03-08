import mongoose from 'mongoose';

const dealerSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  category: { type: String },
  location: { type: String },
  phone: { type: String }
});
const Dealer = (conn) => conn.model('Dealer', dealerSchema, 'Dealers');

export default Dealer;