import React from "react";
import { FaTachometerAlt, FaSearch, FaEnvelope, FaChevronRight } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../styles/StudentDashboard.css";
import SidePanel from "../components/SidePanel";
import user1 from "../assets/profilePic.svg";
import user2 from "../assets/profilePic.svg";
import user3 from "../assets/profilePic.svg";

// Sample Semester-wise GPA Data
const semesterGPA = [
  { sem: "Sem 1", gpa: 7.8 },
  { sem: "Sem 2", gpa: 8.2 },
  { sem: "Sem 3", gpa: 7.5 },
  { sem: "Sem 4", gpa: 8.8 },
  { sem: "Sem 5", gpa: 7.9 },
  { sem: "Sem 6", gpa: 8.5 },
  { sem: "Sem 7", gpa: 9.0 },
  { sem: "Sem 8", gpa: 8.7 },
];

// Calculate Overall CGPA
const overallCGPA =
  semesterGPA.reduce((sum, sem) => sum + sem.gpa, 0) / semesterGPA.length;

// Sample Attendance Data
const attendancePercentage = 75;
const subjectAttendance = {
  Mathematics: "80%",
  Physics: "72%",
  ComputerScience: "85%",
  Chemistry: "78%",
};

// Sample Schedule Data
const scheduleData = [
  { time: "8:00 AM - 9:00 AM", subject: "Mathematics", room: "Room 101", color: "#FF5733" },
  { time: "9:15 AM - 10:15 AM", subject: "Physics", room: "Room 202", color: "#36A2EB" },
  { time: "10:30 AM - 11:30 AM", subject: "Computer Science", room: "Lab 1", color: "#8E44AD" },
  { time: "11:45 AM - 12:45 PM", subject: "Chemistry", room: "Room 303", color: "#2ECC71" },
];

// Sample Announcements Data
const announcements = [
  { faculty: "Faculty Name", title: "XYZ Internship", description: "Internship vacancies in XYZ company for UG students. Apply now.", color: "#C5CAE9" },
  { faculty: "Faculty Name", title: "XYZ Internship", description: "Internship vacancies in XYZ company for UG students. Apply now.", color: "#FFF9C4" },
  { faculty: "Faculty Name", title: "XYZ Internship", description: "Internship vacancies in XYZ company for UG students. Apply now.", color: "#FFCDD2" },
  { faculty: "Faculty Name", title: "XYZ Internship", description: "Internship vacancies in XYZ company for UG students. Apply now.", color: "#C8E6C9" },
];

const StudentDashboard = () => {
  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <SidePanel />

      {/* Main Dashboard Content */}
      <div className="dashboard-container">
        {/* Top Navigation Bar */}
        <div className="top-nav">
          <div className="dashboard-title">
            <FaTachometerAlt className="dashboard-icon" />
            <span>Dashboard</span>
          </div>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search..." />
          </div>
          <div className="nav-icons">
            <FaEnvelope className="mail-icon" />
            <div className="community">
              <img src={user1} alt="User1" className="profile-img profile1" />
              <img src={user2} alt="User2" className="profile-img profile2" />
              <img src={user3} alt="User3" className="profile-img profile3" />
            </div>
          </div>
        </div>

        {/* Two Main Divisions */}
        <div className="main-content">
          {/* Left Division */}
          <div className="left-division">
            {/* Upper Row: Schedule & Attendance */}
            <div className="upper-row">
              {/* Today's Schedule */}
              <div className="schedule-card">
                <h3>Today's Schedule</h3>
                <ul className="schedule-list">
                  {scheduleData.map((item, index) => (
                    <li key={index} className="schedule-item">
                      <div className="schedule-color" style={{ backgroundColor: item.color }}></div>
                      <FaChevronRight className="schedule-arrow" />
                      <div className="schedule-details">
                        <span className="schedule-subject">{item.subject}</span>
                        <span className="schedule-time">{item.time}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Overall Attendance */}
              <div className="attendance-card">
                <CircularProgressbar
                  value={attendancePercentage}
                  text={`${attendancePercentage}%`}
                  styles={buildStyles({
                    textColor: "#800000",
                    pathColor: "#800000",
                    trailColor: "#d6d6d6",
                    strokeLinecap: "round",
                  })}
                />
                <div className="attendance-info">
                  <h4>Overall Attendance</h4>
                  <div className="subject-attendance">
                    <p>Mathematics: {subjectAttendance.Mathematics}</p>
                    <p>Physics: {subjectAttendance.Physics}</p>
                    <p>Computer Science: {subjectAttendance.ComputerScience}</p>
                    <p>Chemistry: {subjectAttendance.Chemistry}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lower Row: Semester-wise GPA Visualization */}
            <div className="gpa-container">
              {/* Overall CGPA Circular Progress */}
              <div className="overall-cgpa">
                <CircularProgressbar
                  value={(overallCGPA / 10) * 100}
                  text={overallCGPA.toFixed(2)}
                  styles={buildStyles({
                    textSize: "16px",
                    pathColor: "#00b894",
                    textColor: "#333",
                    trailColor: "#dfe6e9",
                  })}
                />
                <p className="overall-text">Overall CGPA</p>
              </div>

              {/* Semester Progress */}
              <div className="gpa-card">
                <h4>Semester Progress</h4>
                {semesterGPA.map((sem, index) => (
                  <div key={index} className="gpa-row">
                    <span className="gpa-sem">{sem.sem}</span>
                    <div className="gpa-bar">
                      <div
                        className="gpa-fill"
                        style={{ width: `${(sem.gpa / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="gpa-value">{sem.gpa}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Division (Announcements) */}
          <div className="content">
            <div className="announcements">
              {announcements.map((item, index) => (
                <div className="announcement-card" key={index} style={{ backgroundColor: item.color }}>
                  <div className="announcement-header">
                    {/* Profile Section with Proper Alignment */}
                    <div className="profile-section">
                      <div className="profile-img" style={{ backgroundColor: item.color }}></div>
                      <span className="announcement-author">{item.faculty}</span>
                      <span className="announcement-role">Faculty</span>
                    </div>
                    <span className="announcement-time">12:00 22/06/2025</span>
                  </div>

                  {/* Announcement Content */}
                  <h3 className="announcement-title">{item.title}</h3>
                  <p className="announcement-text">{item.description}</p>
                  
                  {/* Read More Link - Enhanced Visibility */}
                  <a href="#" className="view-more">Read more...</a>
                </div>
              ))}
            </div>
          </div>
      </div>
    </div>
    </div>
  );
};

export default StudentDashboard;
