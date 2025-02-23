import React, { useState } from "react";
import axios from "axios";
import "./resetPassword.css";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState(""); // Add state for email
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // ✅ Add simple password validation (optional)
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      // ✅ Replace this with an actual API call to reset password
      const response = await axios.post("http://localhost:1045/reset-password", {
        email,
        password,
      });

      setMessage("Password successfully reset!");
    } catch (error) {
      setMessage("Unexpected error. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      {/* Left Section for Logo and Illustration */}
      <div className="reset-left-section">
        <div className="reset-image-container">
          <img
            src="https://i.imgur.com/Y3nKbUd.png"
            alt="Shipping Illustration"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>
        <h2 className="reset-logo-text">
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
            alt="logo"
            className="reset-logo-icon"
          />
          InstaShipin
        </h2>
      </div>

      {/* Right Section for Reset Form */}
      <div className="reset-right-section">
        <h2 className="reset-title">Reset Password</h2>

        {message && (
          <p className={`reset-message ${message.includes("success") ? "success" : "error"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="reset-input-group">
            <label>
              Email <span className="reset-required">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="reset-input-group">
            <label>
              New Password <span className="reset-required">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="reset-input-group">
            <label>
              Confirm Password <span className="reset-required">*</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="reset-button" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="reset-login-signup-text">
          Back to <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
