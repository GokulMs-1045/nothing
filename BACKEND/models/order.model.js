const mongoose = require("mongoose");

// Schema for Online Payment Details
const onlinePaySchema = new mongoose.Schema({
    img: { type: String, required: true }
});

// Schema for Regular Payment (if needed later)
const regularSchema = new mongoose.Schema({
    // Add fields if required
});

// Order Schema
const orderSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: String, required: true }, 
    date: { type: Date, required: true },
    month: { type: String, required: true }, // Changed to String for flexibility
    time: { type: String, required: true }, // Mongoose doesn't have 'time' type
    deliveryType: { type: String, enum: ["regular", "oneTime"], required: true },

    // Conditional Payment Details
    payType: { type: String, enum: ["online", "cod"], required: true },
    payDetails: {
        type: mongoose.Schema.Types.Mixed, // Accepts both schemas dynamically
        required: function () { return this.payType === "online"; } // Required only for online payments
    },

    address: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    landmark: { type: String, required: true },
    pincode: { type: String, required: true }
}, { strict: "throw" });

// Order Model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
