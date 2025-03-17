import { Dealer, Customer } from "../../models/User/personalinfo.model.js";

const saveUserInfo = async (req, res) => {
  try {
    const userData = req.body;

    if (userData.userType === "dealer") {
      // Validate dealer-specific fields
      const { businessName, businessCategory, businessAddress } = userData;
      if (!businessName || !businessCategory || !businessAddress) {
        return res.status(400).json({ error: "Dealer-specific fields are required." });
      }

      const dealer = new Dealer(userData);
      await dealer.save();
      return res.status(201).json({ message: "Dealer info saved successfully." });

    } else if (userData.userType === "user") {
      const customer = new Customer(userData);
      await customer.save();
      return res.status(201).json({ message: "Customer info saved successfully." });

    } else {
      return res.status(400).json({ error: "Invalid userType. Must be 'dealer' or 'user'." });
    }
  } catch (error) {
    console.error("Error saving user info:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

export default { saveUserInfo };
