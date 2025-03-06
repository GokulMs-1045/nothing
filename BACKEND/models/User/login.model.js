const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: { type: String, unique: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    avatar: { type: String },
});

const login = mongoose.model("User", userSchema);

module.exports = login;
