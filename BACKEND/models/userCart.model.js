const mongoose = require("mongoose");

const userCartSchema = new mongoose.Schema({
    img: { type: String},
    productTitle: { type: String},
    price: { type: String}
}, { strict: "throw" });

const User = mongoose.model("Cart", userCartSchema);

module.exports = User;
