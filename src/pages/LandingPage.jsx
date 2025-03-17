import React,{ useState,useEffect,useRef} from "react";
import "../styles/LandingPage.css"; // Replace with actual image path
import Logo from "../assets/Logonew.png"; // Replace with actual image path
import announcements from "../assets/announcements.svg"; // Replace with actual image path
import LoginPage from "./LoginPage"; // Import the separate LoginPage component
import { useNavigate } from "react-router-dom";



const LandingPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();
  const loginRef = useRef(null);

  // Toggle login popup
  const toggleLogin = () => {
    setIsLoginOpen((prev) => !prev);
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
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="landing-container">
      <header className="header">
        <div className="logo"> <img src={Logo} className="logo-img" /> </div>
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
              <a href="/student-login">Faculty</a>
              <a href="/faculty-login">Alumni</a>
              <a href="/admin-login">Student</a>
            </div>
          )}
        </div>
      </header>
      {/* Login Popup (When opened on the landing page) */}
      {isLoginOpen && (
        <div className="login-popup-overlay">
          <div className="login-popup" ref={login}>
            <LoginPage closePopup={() => setIsLoginOpen(false)} />
          </div>
        </div>
      )}

      <nav className="category-nav">
        <button className="category-btn active">All</button>
        <button className="category-btn">Internships</button>
        <button className="category-btn">Jobs</button>
        <button className="category-btn">Internal Marks</button>
        <button className="category-btn">Attendance</button>
      </nav>

      <div className="content">
        <div className="announcements">
          {[...Array(6)].map((_, index) => (
            <div className="announcement-card">
            <div className="announcement-header">
              <div className="profile-section">
                <img src="" alt="" className="profile-img" />
                <span className="announcement-author">Dean of Academics</span>
              </div>
              <span className="announcement-time">12:00 22/06/2025</span>
            </div>
            <h3>Mid Time Table for E2 is announced</h3>
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