const User = require("../../models/signup.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;


const signupUser = async (req, res) => {
    try {
        const { name, phone, email, password, dob, state, city, address, userType, dealerDetails } = req.body;

        console.log("Received data:", req.body);

        if (!userType) {
            return res.status(400).json({ message: "User type is required" });
        }

        // Check for duplicate email or phone
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ message: "Email or phone number already exists" });
        }

        // Validate Password
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        let validatedDealerDetails = null;
        if (userType === "dealer") {
            const { companyName, category, businessAddress } = dealerDetails || {};

            if (!companyName || !category || !businessAddress) {
                return res.status(400).json({
                    message: "Missing dealer details. Please provide company name, category, and business address.",
                });
            }

            validatedDealerDetails = { companyName, category, businessAddress };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            dob,
            phone,
            state,
            city,
            address,
            userType,
            dealerDetails: userType === "dealer" ? validatedDealerDetails : null,
        });

        await newUser.save();

        // Generate JWT Token
        const token = jwt.sign({ userId: newUser._id, userType: newUser.userType }, SECRET_KEY, {
            expiresIn: "7d",
        });

        res.json({ message: "User registered successfully"});
    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = signupUser;