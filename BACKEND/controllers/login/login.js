require('dotenv').config(); // Load environment variables
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require("../../models/signup.model");
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login attempt:", email);

        // Find user by email (case insensitive)
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        console.log("✅ User found:", user.email);

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, userType: user.userType },
            process.env.SECRET_KEY, // Use environment variable
            { expiresIn: "1h" }
        );

        // Set token in HttpOnly cookie
        res.cookie("token", token, {
            httpOnly: true, // Secure access
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "Strict",
            maxAge: 3600000, // 1 hour
        });

        console.log("✅ Login successful");
        res.json({ message: "Login successful", token, userType: user.userType });
    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = loginUser;