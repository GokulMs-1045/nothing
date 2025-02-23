const express = require("express");
const mongoose = require("mongoose");
const Order = require(""); // Import the corrected order schema

const app = express();

app.post("/order", async (req, res) => {
    try {
        const { 
            title, price, quantity, date, month, time,
            deliveryType, payType, payDetails,
            name, phone, landmark, address, pincode
        } = req.body;
        console.log("Received order:", req.body);

        // ** Validate Required Fields **
        if (!title || !price || !quantity || !date || !deliveryType || !payType || !name || !phone || !address || !pincode) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // ** Validate Payment Details for Online Payments **
        let validatedPayDetails = null;
        if (payType === "online") {
            if (!payDetails || !payDetails.img) {
                return res.status(400).json({ message: "Payment details (img) are required for online payments" });
            }
            validatedPayDetails = payDetails;
        }

        // ** Create New Order **
        const newOrder = new Order({
            title,
            price,
            quantity,
            date: new Date(date), // Convert date to correct format
            month,
            time,
            deliveryType,
            payType,
            payDetails: validatedPayDetails, // Only for online payments
            name,
            phone,
            landmark,
            address,
            pincode
        });

        await newOrder.save();

        res.status(201).json({ message: "Order placed successfully", order: newOrder });

    }catch (error){
        console.error("❌ Order Error:", error);
        res.status(500).json({ message: "Server error", error });
    }

});

module.exports = router;
