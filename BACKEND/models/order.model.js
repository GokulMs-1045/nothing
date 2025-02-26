const mongoose = require("mongoose");

// Schema for Online Payment Details
const onlinePaySchema = new mongoose.Schema({
    img: { type: String, required: true } // Base64 or URL
});

// Schema for Regular Delivery Details
const regularDeliverySchema = new mongoose.Schema({
    subscriptionStart: { type: Date, required: true }, // Start date of subscription
    subscriptionEnd: { type: Date, required: true },   // End date of subscription
    deliveryFrequency: { type: String, enum: ["daily", "weekly", "monthly"], required: true }
});

// Order Schema
const orderSchema = new mongoose.Schema({
    productImage: { type: String },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    month: { type: Number, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true }, // Use string for time representation

    // Delivery Type & Conditional Fields
    deliveryType: { type: String, enum: ["regular", "oneTime"], required: true },
    regularDeliveryDetails: {
        type: regularDeliverySchema,
        required: function () { return this.deliveryType === "regular"; } // Required if "regular"
    },

    // Payment Details
    payType: { type: String, enum: ["online", "cod"], required: true },
    payDetails: {
        type: onlinePaySchema,
        required: function () { return this.payType === "online"; } // Enforce only for online payments
    },

    // Address & Contact Details
    address: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    landmark: { type: String, required: true },
    pincode: { type: String, required: true }
});

// Order Model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
