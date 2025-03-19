import React, { useState, useEffect, useRef } from "react";
import "../styles/LandingPage.css";
import Logo from "../assets/Logonew.png";
import announcements from "../assets/announcements.svg";
import LoginPage from "./LoginPage"; // Import LoginPage component

const LandingPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null); // Track selected role
  const [isSortByOpen, setIsSortByOpen] = useState(false); // Track Sort By dropdown

  const dropdownRef = useRef(null);
  const loginRef = useRef(null);
  const sortByRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !sortByRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setIsSortByOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Open login popup when selecting an option
  const openLoginPopup = (role) => {
    setSelectedRole(role);
    setIsDropdownOpen(false);
    setIsLoginOpen(true);
  };

  // Close login when clicking outside or pressing ESC
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setIsLoginOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsLoginOpen(false);
        setIsSortByOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className={`landing-container ${isLoginOpen ? "blurred" : ""}`}>
      <header className="header">
        <div className="logo">
          <img src={Logo} className="logo-img" alt="Logo" />
        </div>
        <div className="heading">
          <h1 className="main-text">Department of Electronics and Communication Engineering</h1>
          <p className="sub-text">
            (Constituted under the A.P Govt. Act 18 of 2008 and recognized as per Section 2(f), 12(B) of UGC Act, 1956)
          </p>
        </div>

        {/* Login Dropdown */}
        <div className="login-dropdown" ref={dropdownRef}>
          <button className="login-btn" onClick={toggleDropdown}>Login</button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={() => openLoginPopup("Student")}>Student</button>
              <button onClick={() => openLoginPopup("Faculty")}>Faculty</button>
              <button onClick={() => openLoginPopup("Alumni")}>Alumni</button>
            </div>
          )}
        </div>
      </header>

      {/* Login Popup */}
      {isLoginOpen && (
        <div className="login-popup-overlay">
          <div className="login-popup" ref={loginRef}>
            <LoginPage role={selectedRole} closePopup={() => setIsLoginOpen(false)} />
          </div>
        </div>
      )}

      {/* Mobile: Latest Updates + Sort By Dropdown */}
      <div className="latest-updates-container mobile-only">
        <span>Latest Updates</span>
        <div className="sort-by-container" ref={sortByRef}>
          <button className="sort-by-dropdown" onClick={() => setIsSortByOpen(!isSortByOpen)}>
            Sort By ▼
          </button>
          {isSortByOpen && (
            <div className="dropdown-menu sort-dropdown active">
              <button onClick={() => setIsSortByOpen(false)}>All</button>
              <button onClick={() => setIsSortByOpen(false)}>Internships</button>
              <button onClick={() => setIsSortByOpen(false)}>Jobs</button>
              <button onClick={() => setIsSortByOpen(false)}>Internal Marks</button>
              <button onClick={() => setIsSortByOpen(false)}>Attendance</button>
            </div>
          )}
        </div>
      </div>

      {/* === DESKTOP ONLY: Category Navigation === */}
      <nav className="category-nav desktop-only">
        <button className="category-btn active">All</button>
        <button className="category-btn">Internships</button>
        <button className="category-btn">Jobs</button>
        <button className="category-btn">Internal Marks</button>
        <button className="category-btn">Attendance</button>
      </nav>

      <div className="content">
        <div className="announcements">
          {[...Array(6)].map((_, index) => (
            <div className="announcement-card" key={index}>
              <div className="announcement-header">
                <div className="profile-section">
                  <img src="" alt="" className="profile-img" />
                  <span className="announcement-author">Dean of Academics</span>
                </div>
                <span className="announcement-time">12:00 22/06/2025</span>
              </div>
              <h3 className="announcement-title">Mid Time Table for E2 is announced</h3>
              <p>Mid 2 schedule came out, so I request all the students to check it</p>
              <a href="#" className="view-more">View More</a>
            </div>
          ))}
        </div>

        <div className="announcement-image">
          <img src={announcements} alt="Announcement" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;