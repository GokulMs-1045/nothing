const userCart = require("../../models/Customer/cart.model");

const userCart = async (req, res) => {
    try {
        const newCart = new Order(req.body);
        await newCart.save();

        res.status(201).json({ message: "cart placed successfully", order: newOrder });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = userCart;
