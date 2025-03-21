import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for API requests
import "../styles/LoginPage.css";

// Import images based on roles
import StudentImage from "../assets/Student.svg";
import FacultyImage from "../assets/Faculty.svg";
import AlumniImage from "../assets/Alumni.svg";

const LoginPage = ({ role, closePopup }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

  // Handle login
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Extract token and role from the response
      const { token, role } = response.data;

      // Store token in sessionStorage (or localStorage)
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", role);

      // Redirect based on role
      if (role === "Student") navigate("/studentdashboard");
      else if (role === "Faculty") navigate("/faculty-dashboard");
      else if (role === "Alumni") navigate("/alumni-dashboard");
      else setError("Invalid role detected.");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
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
          {error && <p className="error-message">{error}</p>}

          <div className="login-form">
            <label>Email</label>
            <div className="input-group">
              <span className="icon">👤</span>
              <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>

            <label>Password</label>
            <div className="input-group">
              <span className="icon">🔒</span>
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>

            <a href="#" className="forgot-password">Forgot password?</a>

            <button className="login-submit" onClick={handleLogin}>Login</button>

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
