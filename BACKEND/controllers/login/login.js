import express from "express";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import login from "../../models/User/login.model.js"; // ✅ Correct model reference
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// POST: /login/google/callback - Handle Google OAuth Callback
const auth = async (req, res) => {
  // try {
  //     const { token } = req.body; // Get Google token from client

  //     // Verify Google token
  //     const ticket = await client.verifyIdToken({
  //     idToken: token,
  //     audience: process.env.GOOGLE_CLIENT_ID,
  //     });

  //     const payload = ticket.getPayload();

  //     let User = await login.findOne({ email: payload.email }); // Check if user exists

  //     if (!User) {
  //       // If user doesn't exist, create a new user
  //     User = new login({
  //         googleId: payload.sub,
  //         name: payload.name,
  //         email: payload.email,
  //         email_verified: payload.email_verified,
  //         picture: payload.picture,
  //         given_name: payload.given_name,
  //         accessToken: token, // Save token for later use if necessary
  //     });

  //       await User.save(); // Save new user to DB
  //     }

  //     // Generate JWT Token for authentication
  //     const jwtToken = jwt.sign({ id: User._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  //     res.json({ token: jwtToken, User }); // Send JWT and user data to client
  // } catch (error) {
  //     console.error("Google OAuth Error:", error);
  //     res.status(500).json({ message: "OAuth authentication failed" });
  // }
  try {
    const { token } = req.body;

    // Verify Google Token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    let user = await login.findOne({ email: payload.email });

    if (user) {
      console.log("Existing user found:", user.email);
      // If the user exists but was created manually, update with Google ID
      if (!user.googleId) {
        user.googleId = payload.sub; // Link Google ID to existing account
        await user.save();
      }
    } else {
      // Create new user if not found
      user = new login({
        googleId: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      });
      await user.save();
    }

    // Generate JWT Token for authentication
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token: jwtToken, user });
  } catch (error) {
    console.error("Google OAuth Error:", error);
    res.status(500).json({ message: "OAuth authentication failed" });
  }
};

export default auth;