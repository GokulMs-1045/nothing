const myStore = require("../../models/Dealer/myStore.model");

// ✅ GET Store Details
const getStore = async (req, res) => {
    try {
        const { googleid } = req.params; // Use req.query instead of req.params

        if (!googleid) {
            return res.status(400).json({ message: "Store name is required" });
        }

        const StoreDetails = await myStore.findOne({ googleid });

        if (!StoreDetails) {
            return res.status(404).json({ message: "Store details not found" });
        }

        res.status(200).json(StoreDetails);
    } catch (error) {
        res.status(500).json({ message: "Error fetching store details", error: error.message });
    }
};

// ✅ UPDATE Store Details
const editStore = async (req, res) => {
    try {
        const { googleid } = req.params; // Get store name from URL
        const { name, category, phoneNumber, address } = req.body; // Get new details from request body

        if (!googleid) {
            return res.status(400).json({ message: "Invalid URL" });
        }

        if (!name || !category || !phoneNumber || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        console.log("Updating store:", googleid);

        const updatedStore = await myStore.findOneAndUpdate( 
            { googleid : googleid }, // Find by google id : googleid route
            { name, category, phoneNumber, address }, // Update all fields, including name
            { new: true } // Return the updated document
        );

        if (!updatedStore) {
            return res.status(404).json({ message: `Store '${googleid}' not found` });
        }

        res.status(200).json({ message: "Store details updated successfully", updatedStore });
    } catch (error) {
        res.status(500).json({ message: "Error updating store details", error: error.message });
    }
};



module.exports = { getStore, editStore };
