const mongoose = require('mongoose');
const { Dealer } = require('../../config/db'); // Ensure correct path

const StoreSchema = new mongoose.Schema({
  name: String,
  category: String,
  phoneNumber: [{ countryCode: String, number: String }],
  address: { street: String, city: String, state: String },
});
const StoreDetails = Dealer.model("StoreDetails", StoreSchema, "StoreDetails"); // Use Dealer DB
module.exports = StoreDetails; 
