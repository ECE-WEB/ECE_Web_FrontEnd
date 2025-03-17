import React,{ useState,useEffect,useRef} from "react";
import "../styles/LandingPage.css"; // Replace with actual image path
import Logo from "../assets/Logonew.png"; // Replace with actual image path
import announcements from "../assets/announcements.svg"; // Replace with actual image path


const LandingPage = () => {
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

      <nav className="category-nav">
        <button className="category-btn active">All</button>
        <button className="category-btn">Academics</button>
        <button className="category-btn">Sports</button>
        <button className="category-btn">Career</button>
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