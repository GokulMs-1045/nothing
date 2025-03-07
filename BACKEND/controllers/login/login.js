
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const login = require('../../models/User/');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    user = new User({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        avatar: profile.photos[0].value,
                    });
                    await user.save();
                }

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
    
=======
require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const users = []; // Simulated user database

// Secret Key for JWT
const JWT_SECRET = process.env.JWT_SECRET;

// OAuth 2.0 Login - Generates JWT Token
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token (OAuth 2.0 Access Token)
    const accessToken = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ accessToken });
});

// Register User


// Protected Route (Requires JWT Token)
app.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "Protected data accessed", user: req.user });
});

// Middleware to Verify JWT Token


// Start Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
