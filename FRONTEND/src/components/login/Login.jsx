import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { FaUser, FaLock } from "react-icons/fa";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:1045/login", credentials, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Credentials to be sent:", credentials);

      
      console.log("Login Successful:", response.data);
      localStorage.setItem("token", response.data.token); // Store token
      navigate("/dashboard"); // Redirect after successful login
    } catch (err) {
      setError(err.response?.data?.message || "Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left-section">
        <div className="login-image-container">
          <img src="https://i.imgur.com/Y3nKbUd.png" alt="Shipping Illustration" />
        </div>
        <h2 className="login-logo-text">
          <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="logo" className="login-logo-icon" />
          InstaShipin
        </h2>
      </div>

      <div className="login-right-section">
        <div className="login-box">
          <h2>Welcome to InstaShipin</h2>
          <p className="login-subtitle">Ship Smarter Today</p>

          {error && <p className="login-error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="login-input-group">
              <FaUser className="login-icon" />
              <input
                type="text"
                name="email"
                placeholder="Username or email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="login-input-group">
              <FaLock className="login-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="login-options">
              <label>
                <input type="checkbox" /> Remember Me
              </label>
              <Link to="/Reset">Forgot Password?</Link>
            </div>

            <button className="login-sign-in-button" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="login-signup-text">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;