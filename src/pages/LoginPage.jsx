import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

// Import images based on roles
import StudentImage from "../assets/Student.svg";
import FacultyImage from "../assets/Faculty.svg";
import AlumniImage from "../assets/Alumni.svg";

const LoginPage = ({ role, closePopup }) => {
  const navigate = useNavigate();

  // Determine image based on role
  const getRoleImage = () => {
    switch (role) {
      case "Student":
        return StudentImage;
      case "Faculty":
        return FacultyImage;
      case "Alumni":
        return AlumniImage;
      default:
        return "";
    }
  };

  return (
    <div className="login-container">
      {/* Left Side - Image */}
      <div className="login-image">
        <img src={getRoleImage()} alt={`${role} Login`} />
      </div>

      {/* Right Side - Login Card */}
      <div className="div2">
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
    </div>
  );
};

export default LoginPage;
