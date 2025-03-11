import mongoose from 'mongoose';
import { Customer } from '../../config/db.js';

const shippingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  zip: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  landmark: { type: String, required: true },
  address: { type: String, required: true },
});

const regularDeliverySchema = new mongoose.Schema({
  frequency: {
    type: String,
    enum: ['Daily', 'Weekly', 'Monthly'],
    required: true,
  },
  days: {
    type: [String], // For Weekly: e.g., ['Sunday', 'Monday']
    default: [],
  },
  dates: {
    type: [Number], // For Monthly: e.g., [1, 15] (dates of the month)
    default: [],
  },
});

const orderSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true, // Fetched from the authenticated user
  },
  productName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  returnPolicy: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  deliveryTime: {
    type: String, // e.g., "1 AM", "2 PM"
    required: true,
  },
  deliveryType: {
    type: String,
    enum: ['One Time Delivery', 'Regular Delivery'],
    required: true,
  },
  regularDeliveryDetails: {
    type: regularDeliverySchema,
    required: function () {
      return this.deliveryType === 'Regular Delivery';
    },
  },
  deliveryMode: {
    type: String,
    required: true,
  },
  paymentMode: {
    type: String,
    enum: ['Cash on Delivery', 'Online Payment'],
    required: true,
  },
  paymentFile: {
    type: String, // Path to the uploaded file for online payment
    required: function () {
      return this.paymentMode === 'Online Payment';
    },
  },
  shippingDetails: {
    type: shippingSchema,
    required: true,
  },
}, { timestamps: true });

const Order = Customer.model('Orders', orderSchema);
export default Order;