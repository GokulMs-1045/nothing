require("dotenv").config();
const mongoose = require('mongoose')

const URL = process.env.URL;

mongoose
    .connect(URL, {})
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("❌ MongoDB Error:", err));


module.exports = mongoose