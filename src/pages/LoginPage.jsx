import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css"; // Import styles
 // Replace with actual image path

const LoginPage = ({ closePopup }) => {
  const navigate = useNavigate();

  return (
    <div className="login-container">

        
        {/* Left Side - Image */}
        <div className="login-image">
          <img src="" alt="Login Visual" />
        </div>

        {/* Right Side - Login Card */}
        <div className="login-box">
          <h2 className="login-title">Login</h2>
          
          <div className="login-form">
            <label>Username</label>
            <div className="input-group">
              <span className="icon">👤</span>
              <input type="email" placeholder="Email" />
            </div>

            <label>Password</label>
            <div className="input-group">
              <span className="icon">🔒</span>
              <input type="password" placeholder="Password" />
            </div>

            <a href="#" className="forgot-password">Forgot password?</a>

            <button className="login-submit">Login</button>

            <button className="google-login">
              <span className="google-icon">G</span> Sign in with Google
            </button>

            {/* Show Back Button when used as a popup */}
            {closePopup ? (
              <button className="back-btn" onClick={closePopup}>← Back</button>
            ) : (
              <button className="back-btn" onClick={() => navigate("/")}>← Back</button>
            )}
          </div>
        </div>

      </div>
  );
};

export default LoginPage;
