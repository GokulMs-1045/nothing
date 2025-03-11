import React, { useState } from "react";
import axios from "axios";
import "./perInfo.css";


const indianStates = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro"],
  "Assam": ["Guwahati", "Dispur", "Silchar", "Dibrugarh", "Jorhat"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Korba", "Bilaspur", "Durg"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
  "Haryana": ["Chandigarh", "Faridabad", "Gurugram", "Panipat", "Ambala"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Manali", "Solan", "Mandi"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar"],
  "Karnataka": ["Bengaluru", "Mysore", "Hubli", "Mangalore", "Belgaum"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Alappuzha"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Ukhrul"],
  "Meghalaya": ["Shillong", "Tura", "Nongstoin", "Jowai", "Baghmara"],
  "Mizoram": ["Aizawl", "Lunglei", "Saiha", "Champhai", "Kolasib"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Berhampur"],
  "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner"],
  "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Ravangla"],
  "Tamil Nadu": [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", 
  "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", 
  "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", 
  "Nagapattinam", "Namakkal", "Perambalur", "Pudukkottai", "Ramanathapuram", 
  "Ranipet", "Salem", "Sivagangai", "Tenkasi", "Thanjavur", "Theni", 
  "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupattur", "Tiruppur", 
  "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", 
  "Virudhunagar"
],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar", "Belonia"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri"],
};
const categories = [
  "Fresh Fruits",
  "Fresh Vegetables",
  "Organic Produce",
  "Exotic Fruits & Vegetables",
  "Grains & Pulses",
  "Dairy & Poultry",
  "Meat & Seafood",
  "Dry Fruits & Nuts",
  "Spices & Herbs",
  "Seeds & Fertilizers",
  "Farming Tools & Equipment",
  "Transport & Logistics Services",
  "Clothing & Apparel",
  "Handmade & Traditional Food Products",
  "Local Handicrafts & Accessories",
];

const PersonalInfo = () => {
  const [userType, setUserType] = useState("user");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    phone: "",
    state: "",
    city: "",
    address: "",
    userType:"user",
    businessName: "",
    businessCategory: "",
    businessAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;  // Ensure correct destructuring
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    const updatedFormData = { ...formData, userType };
    try {
      const response = await axios.post(
        "http://localhost:1045/per-info", // Replace with your actual API URL
        updatedFormData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Signup successful:", response.data);
      setMessage("Signup successful! Please log in.");
    } catch (error) {
      console.error("Signup failed:", error.response ? error.response.data : error.message);
      setMessage(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="container">
  
      <div className="left-section">
        <div className="image-container">
          <img src="https://i.imgur.com/Y3nKbUd.png" alt="Shipping Illustration" />
        </div>
        <h2 className="logo-text">
          <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="logo" className="logo-icon" />
          InstaShipin
        </h2>
      </div>
      <div className="right-section">
        <form className="signup-container" onSubmit={handleSubmit} style={{ height: userType === "Dealer" ? "770px" : "600px" }}>
          <h2>Personal Information</h2>
          <h4>Enter Your Details</h4>

          {message && <p className="message">{message}</p>}

          <div className="row">
            <div className="input-group">
              <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} required />
              <label>Name</label>
            </div> 
          </div>

          <div className="row">
            <div className="input-group">
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
              <label>DOB</label>
            </div>
            <div className="input-group">
              <input type="text" name="phone" placeholder="Enter Phone Number" value={formData.phone} onChange={handleChange} required />
              <label>Phone</label>
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <select name="state" value={formData.state} onChange={handleChange} required>
                <option value="">Select State</option>
                {Object.keys(indianStates).map((stateName) => (
                  <option key={stateName} value={stateName}>{stateName}</option>
                ))}
              </select>
              <label>State</label>
            </div>
            <div className="input-group">
              <select name="city" value={formData.city} onChange={handleChange} required>
                <option value="">Select City</option>
                {(indianStates[formData.state] || []).map((cityName) => (
                  <option key={cityName} value={cityName}>{cityName}</option>
                ))}
              </select>
              <label>City</label>
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <input type="text" name="address" placeholder="Enter Address" value={formData.address} onChange={handleChange} required />
              <label>Address</label>
            </div>
            <div className="input-group">
              <select name="userType" value={userType} onChange={(e) => setUserType(e.target.value)}>
                <option value="user">Customer</option>
                <option value="dealer">Dealer</option>
              </select>
              <label>User Type</label>
            </div>
          </div>

          {userType === "dealer" && (
            <>
              <div className="row">
                <div className="input-group">
                  <input type="text" name="businessName" placeholder="Enter Company Name" value={formData.businessName} onChange={handleChange} required />
                  <label>Company Name</label>
                </div>
                <div className="input-group">
                <select name="businessCategory" value={formData.category} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <label>Category</label>
                </div>
              </div>
              <div className="input-group">
                <input type="text" name="businessAddress" placeholder="Enter Business Address" value={formData.businessAddress} onChange={handleChange} required />
                <label>Business Address</label>
              </div>
            </>
          )}

          <button className="submit-btn" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;