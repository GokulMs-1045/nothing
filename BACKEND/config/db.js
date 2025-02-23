require("dotenv").config();
const mongoose = require('mongoose')

const URL = process.env.URL || "mongodb://127.0.0.1:27017/yourDatabase";

mongoose
    .connect(URL, {})
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("❌ MongoDB Error:", err));


module.exports = mongoose