import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import "./login.css";

const Login = () => {

  const location = useLocation();
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(location.state?.isSignup || false);

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  console.log("Google Client ID:", import.meta.env.VITE_CLIENT_ID);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {

      const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
      });

      console.log( "Login Successful",response.data);

      if (isForgotPassword) {
        setSuccess(true);
        setTimeout(() => setIsForgotPassword(false), 2000);
      } else {
        localStorage.setItem("token", response.data.token);
        alert(`${isSignup ? "Signup" : "Login"} Successful!`);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = async (response) => {
    try {
      const { credential } = response;
      const res = await axios.post(
        "http://localhost:1045/login/google/callback",
        { token: credential },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
  
      localStorage.setItem("token", res.data.token);
      alert("Google Login Successful!");
      navigate("/personal-info");

    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login failed. Please try again.");
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <div className="login-container">
        <div className="login-left-section">
          <div className="login-image-container">
            <img
              src="https://i.imgur.com/Y3nKbUd.png"
              alt="Shipping Illustration"
            />
          </div>
          <h2 className="login-logo-text">
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
              alt="logo"
              className="login-logo-icon"
            />
            InstaShipin
          </h2>
        </div>

        <div className="login-right-section">
          <div className="login-box">
            <h2> Welcome to InstaShipin</h2>
            <p className="login-subtitle">Ship Smarter Today</p>

            <form onSubmit={handleSubmit}>
              {isSignup && (
                <div className="login-input-group">
                  <FaEnvelope className="login-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="login-input-group">
                <FaLock className="login-icon" />
              </div>

              {isForgotPassword && (
                <div className="login-input-group">
                  <FaLock className="login-icon" />
                </div>
              )}

              <button
                className="login-sign-in-button"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? isForgotPassword
                    ? "Resetting..."
                    : isSignup
                    ? "Signing up..."
                    : "Signing in..."
                  : isForgotPassword
                  ? "Reset Password"
                  : isSignup
                  ? "Sign Up"
                  : "Sign In"}
              </button>
              {isForgotPassword && (
                <p>
                  <div className="back-text">
                    Back to{" "}
                    <span
                      className="signup-link"
                      onClick={() => {
                        console.log("Switching back to Sign In..."); // Debugging
                        setIsForgotPassword(false);
                        setIsSignup(false);
                        setCredentials({
                          username: "",
                          email: "",
                          password: "",
                          confirmPassword: "",
                        });
                      }}
                    >
                      Sign In
                    </span>
                  </div>
                </p>
              )}
            </form>

            <div className="or-divider">
              <hr className="line" /> 
              <span>or</span>
              <hr className="line" />
            </div>

            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => alert("Google Sign-In failed. Please try again.")}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;