import React from "react";
import "../styles/LandingPage.css"; // Replace with actual image path

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="header">
        <div className="logo"> {/* Placeholder for Logo */} </div>
        <h1>Department of Electronics and Communication Engineering</h1>
        <p className="sub-text">
          (Constituted under the A.P Govt. Act 18 of 2008 and recognized as per Section 2(f), 12(B) of UGC Act, 1956)
        </p>
        <button className="login-btn">Login</button>
      </header>

      <nav className="category-nav">
        <button className="category-btn active">All</button>
        <button className="category-btn">Academics</button>
        <button className="category-btn">Sports</button>
        <button className="category-btn">Career</button>
      </nav>

      <main className="content">
        <div className="announcements">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="announcement-card">
              <div className="announcement-header">
                <span className="role">Dean of Academics</span>
                <span className="timestamp">12:00 22/06/2025</span>
              </div>
              <h3>Mid Time Table for E2 is announced</h3>
              <p>Mid 2 schedule came out so I request all the students to check it</p>
              <a href="#" className="view-more">View More</a>
            </div>
          ))}
        </div>

        <div className="announcement-image">
          <img src="" alt="Announcement" />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;