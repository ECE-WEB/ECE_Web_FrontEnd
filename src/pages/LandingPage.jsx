import React, { useState } from "react";
import sagaGif from "../assets/saga.gif";
import Logo from "../assets/Logo.jpg";
import "../styles/LandingPage.css"; // Importing the CSS file

const announcements = [
  {
    id: 1,
    title: "Mid Time Table for E2 is announced",
    description: "Mid 2 schedule came out so I request all the students to check it",
    author: "Dean of Academics",
    time: "12:00 22/06/2025",
  },
  {
    id: 2,
    title: "Mid Time Table for E2 is announced",
    description: "Mid 2 schedule came out so I request all the students to check it",
    author: "Dean of Academics",
    time: "12:00 22/06/2025",
  },
  {
    id: 3,
    title: "Mid Time Table for E2 is announced",
    description: "Mid 2 schedule came out so I request all the students to check it",
    author: "Dean of Academics",
    time: "12:00 22/06/2025",
  },
];

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="landing-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <img src={Logo} alt="Logo" className="logo" />
          <div className="header-text">
            <h1 className="header-title">Department of Electronics and Communication Engineering</h1>
            <p className="header-subtitle">(Constituted under the A.P. Govt. Act 18 of 2008 and recognized as per Section 2(f), 12(B) of UGC Act, 1956)</p>
          </div>
        </div>
        <button className="login-button" onClick={() => setMenuOpen(!menuOpen)}>
          Login
        </button>
        {menuOpen && (
          <div className="dropdown-menu">
            <button onClick={() => setMenuOpen(false)}>Faculty</button>
            <button onClick={() => setMenuOpen(false)}>Alumni</button>
            <button onClick={() => setMenuOpen(false)}>Student</button>
          </div>
        )}
      </header>

      {/* Category Buttons */}
      <div className="category-buttons">
        <button className="category-button">All</button>
        <button className="category-button">Academics</button>
        <button className="category-button">Sports</button>
        <button className="category-button">Career</button>
      </div>

      <div className="content-grid">
        {/* Announcements Section */}
        <div className="announcements-container">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="announcement-card">
              <div className="announcement-header">
                <div className="announcement-author">
                  <div className="avatar">{announcement.author.charAt(0)}</div>
                  <span className="announcement-author-name">{announcement.author}</span>
                </div>
                <span className="announcement-time">{announcement.time}</span>
              </div>
              <h2 className="announcement-title">{announcement.title}</h2>
              <p className="announcement-description">{announcement.description}</p>
              <p className="view-more">View More</p>
            </div>
          ))}
        </div>

        {/* GIF Section */}
        <div className="gif-container">
          <img src={sagaGif} alt="GIF Placeholder" className="gif-image" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
