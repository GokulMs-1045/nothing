import mongoose from "mongoose";
import { UserDetails } from "../../config/db.js";

const dealerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: String, default: false },
    phone: { type: String },
    state: { type: String },
    city: { type: String },
    address: { type: String },
    userType: { type: String, enum: ['dealer'], default: 'dealer' },
    businessName: { type: String, required: true },
    businessCategory: { type: String, required: true },
    businessAddress: { type: String, required: true }
}, { timestamps: true });

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: String ,default :"" },
  phone: { type: String },
  state: { type: String },
  city: { type: String },
  address: { type: String },
  userType: { type: String, enum: ['user'], default: 'user' }
}, { timestamps: true });

const Customer = UserDetails.model('Customers', customerSchema);
const Dealer = UserDetails.model('Dealers', dealerSchema);

export { Dealer, Customer};