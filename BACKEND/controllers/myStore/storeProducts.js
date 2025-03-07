const Product = require("../../models/Dealer/product.model");
const StoreDetails = require("../../models/Dealer/myStore.model");

const addProduct = async (req, res) => {
    try {
        const { googleid } = req.params; // Extract phone number from URL params
        const { name, description, price, inStock } = req.body;

        if (!name || !price || !inStock) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find the store using phone number
        const store = await StoreDetails.findOne({ 
             
            "googleid": String
        });

        if (!store) {
            return res.status(404).json({ message: "Store not found for this phone number" });
        }

        // Create a new product linked to the store
        const newProduct = new Product({
            name,
            description,
            price,
            inStock,
            store: store._id, // Link to store
        });

        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", newProduct });

    } catch (error) {
        res.status(500).json({ message: "Error adding product", error: error.message });
    }
};

const getProductsByGoogleid = async (req, res) => {
    try {
        const { googleid } = req.params; // Get phone number from route

        if (!googleid) {
            return res.status(400).json({ message: "Google is required in the route" });
        }

        // Find the store using the phone number
        const store = await StoreDetails.findOne({
            "googleid": googleid
        });

        if (!store) {
            return res.status(404).json({ message: "Store not found for this phone number" });
        }

        // Fetch all products linked to this store
        const products = await Product.find({ store: store._id });

        res.status(200).json({ message: "Products fetched successfully", products });

    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

module.exports = { addProduct, getProductsByGoogleid};
