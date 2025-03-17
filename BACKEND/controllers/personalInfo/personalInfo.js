import personalInfoModel from "../../models/User/perInfo.model.js";
import loginModel from "../../models/User/login.model.js";

const personalInfoController = async (req, res) => {
  try {
    const {
      name,
      dob,
      phone,
      state,
      city,
      address,
      userType,
      businessName,
      businessCategory,
      businessAddress,
      email,
    } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // ✅ Find the user from login table
    const existingUser = await loginModel.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found in database." });
    }

    const newPersonalInfo = new personalInfoModel({
      name,
      dob,
      phone,
      state,
      city,
      address,
      userType,
      businessName,
      businessCategory,
      businessAddress,
      email,
      googleId: existingUser.googleId, // ✅ Store Google ID from login table
    });

    await newPersonalInfo.save();

    res.status(201).json({ message: "Personal info saved successfully" });
  } catch (error) {
    console.error("Personal Info Save Error:", error);
    res.status(500).json({ error: "Server error while saving personal info" });
  }
};

export default personalInfoController;