import React, { useState } from "react";
import paymentStyles from "./PaymentOptions.module.css";

const PaymentOptions = () => {
  const [deliveryMode, setDeliveryMode] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    zip: "",
    city: "",
    state: "",
    landmark: "",
    address: "",
  });

  // Function to handle image selection
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setBase64Image(reader.result); // Save Base64 string
        alert("Image uploaded successfully!"); // Show alert
      };
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <div className={paymentStyles.maincontainer}>
      {/* mode */}
      <div className={paymentStyles.modecontainer}>
        {/* delivery mode */}
        <div className={paymentStyles.dropdown1}>
          <label>Delivery Mode:</label>
          <select value={deliveryMode} onChange={(e) => setDeliveryMode(e.target.value)} required>
            <option value="">Select</option>
            <option value="Delivery Partner">Delivery Partner</option>
            <option value="Self Pickup">Self Pickup</option>
          </select>
        </div>
        {/* Payment mode */}
        <div className={paymentStyles.dropdown2}>
          <label>Payment Mode:</label>
          <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)} required>
            <option value="">Select</option>
            <option value="Online">Online Payment</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>

        {/* Image Section */}
        <div className={`${paymentStyles.imageContainer} ${paymentMode !== "Online" ? paymentStyles.blurred : ""}`}>
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=RandomQR" alt="Payment" />
        </div>

        {/* Upload Image Only If Online Payment Is Selected */}
        {paymentMode === "Online" && (
          <>
            <p style={{ textAlign: "center", marginTop: "50px", fontWeight: "bolder" }}>
              Upload the Payment Screenshot Below.
            </p>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleImageUpload}
                required={paymentMode === "Online"} // Make it required only for Online Payment
              />
            </div>
          </>
        )}
      </div>

      {/* Address Section */}
      <div className={paymentStyles.addresscontainer}>
        <div className={paymentStyles.addresssec}>
          <h2 className={paymentStyles.title}>Shipping Address</h2>
          <form>
            <label className={paymentStyles.label}>Name:</label>
            <input
              type="text"
              name="name"
              className={paymentStyles.input}
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <br />

            <label className={paymentStyles.label}>Ph Number:</label>
            <input
              type="text"
              name="phone"
              className={paymentStyles.input}
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <br />

            <div className={paymentStyles.ziprow}>
              <div>
                <label className={paymentStyles.label1}>ZIP:</label>
                <input
                  type="text"
                  name="zip"
                  className={paymentStyles.input1}
                  placeholder="ZIP"
                  value={formData.zip}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className={paymentStyles.label1}>City:</label>
                <input
                  type="text"
                  name="city"
                  className={paymentStyles.input1}
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <label className={paymentStyles.label}>Landmark:</label>
            <input
              type="text"
              name="landmark"
              className={paymentStyles.input}
              placeholder="Enter landmark"
              value={formData.landmark}
              onChange={handleInputChange}
              required
            />
            <br />

            <label className={paymentStyles.addresslabel}>Address:</label>
            <div>
              <textarea
                name="address"
                className={paymentStyles.addressinput}
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleInputChange}
                required
              ></textarea>
              <br />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
