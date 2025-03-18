import React, { useState } from "react";
import { FaBars, FaSignOutAlt, FaChartBar, FaBook, FaUserCheck, FaBell } from "react-icons/fa";
import "../styles/SidePanel.css";
import profilePic from "../assets/profilePic.svg";
import studentIllustration from "../assets/studentreading.svg";

const SidePanel = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Dashboard"); // Default active menu item

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (item) => {
    setActiveItem(item); // Set the clicked menu item as active
  };

  return (
    <div className={`sidepanel ${isOpen ? "expanded" : "collapsed"}`}>
      {/* Profile Section */}
      <div className="top-section">
        <div className="profile-container">
          <img src={profilePic} alt="Profile" className="profile-pic" />
          {isOpen && (
            <div className="profile-info">
              <span className="profile-name">Student Name</span>
              <span className="profile-email">studentidno@rguktkrkv.ac.in</span>
            </div>
          )}
        </div>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      {/* Sidebar Menu */}
      <div className="menu">
        <div 
          className={`menu-item ${activeItem === "Dashboard" ? "active" : ""}`} 
          onClick={() => handleMenuClick("Dashboard")}
        >
          <FaChartBar className="icon" />
          {isOpen && <span>Dashboard</span>}
        </div>
        <div 
          className={`menu-item ${activeItem === "Check Marks" ? "active" : ""}`} 
          onClick={() => handleMenuClick("Check Marks")}
        >
          <FaBook className="icon" />
          {isOpen && <span>Check Marks</span>}
        </div>
        <div 
          className={`menu-item ${activeItem === "Check Attendance" ? "active" : ""}`} 
          onClick={() => handleMenuClick("Check Attendance")}
        >
          <FaUserCheck className="icon" />
          {isOpen && <span>Check Attendance</span>}
        </div>
        <div 
          className={`menu-item ${activeItem === "Notifications" ? "active" : ""}`} 
          onClick={() => handleMenuClick("Notifications")}
        >
          <FaBell className="icon" />
          {isOpen && <span>Notifications</span>}
        </div>
      </div>

      {/* Illustration & Logout */}
      <div className="bottom-section">
        {isOpen && (
          <div className="illustration-container">
            <img src={studentIllustration} alt="Student Reading" className="illustration" />
          </div>
        )}
        <div className="menu-item logout">
          <FaSignOutAlt className="icon" />
          {isOpen && <span>Logout</span>}
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
