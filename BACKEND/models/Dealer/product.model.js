const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    //img
    
    description: { type: String },
    price: { type: Number, required: true },
    inStock: { type: Number, required: true },
    store: { type: mongoose.Schema.Types.ObjectId, ref: "StoreDetails", required: true } // Link to store
}, { timestamps: true });

module.exports = mongoose.model("Products", productSchema);
