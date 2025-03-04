const mongoose = require("mongoose");

const dealerSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    category: { type: String, required: true },
    businessAddress: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, unique: true, required: true, lowercase: true }, 
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    userType: { type: String, enum: ["customer", "dealer"], required: true },
    dealerDetails: {
        type: dealerSchema,
        validate: {
            validator: function (v) {
                return this.userType === "dealer" ? !!v : true;
            },
            message: "Dealer details are required for dealer accounts."
        }
    }
}, { strict: "throw" });

const User = mongoose.model("User", userSchema);

module.exports = User;
