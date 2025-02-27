const mongoose = require("mongoose");

// Order Schema
const orderSchema = new mongoose.Schema({
    productImage: { type: String },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    month: { type: Number, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true }, // Use string for time representation
});
// Order Model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
