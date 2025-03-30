/* eslint-disable no-unused-vars */
import React from "react";
import { FaTachometerAlt, FaSearch, FaEnvelope, FaChevronRight } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { BarChart, XAxis, YAxis, Tooltip, Bar,Cell,ResponsiveContainer } from "recharts";

import "react-circular-progressbar/dist/styles.css";
import "../styles/StudentDashboard.css";
import NavBar from "../components/NavBar";
// Sample Semester-wise GPA Data
const semesterGPA = [
  { sem: "Sem 1", gpa: 7.8 },
  { sem: "Sem 2", gpa: 8.2 },
  { sem: "Sem 3", gpa: 7.5 },
  { sem: "Sem 4", gpa: 8.8 },
  { sem: "Sem 5", gpa: 5.9 },
  { sem: "Sem 6", gpa: 5.5 },
  { sem: "Sem 7", gpa: 9.0 },
  { sem: "Sem 8", gpa: 5.7 },
];

// Calculate Overall CGPA
const overallCGPA =
  semesterGPA.reduce((sum, sem) => sum + sem.gpa, 0) / semesterGPA.length;


// Sample Attendance Data
const attendancePercentage = 75;
const subjectAttendance = {
  SS: 40,
  CS: 68,
  DSP: 100,
  DLD: 78,
  RLR: 70,
};
const attendanceData = Object.entries(subjectAttendance).map(([subject, percentage]) => ({
  subject,
  attendance: percentage, // Ensure numerical values
}));


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
    <div className="sd-dashboard-wrapper">
      {/* Sidebar */}
 

      {/* Main Dashboard Content */}
      <div className="sd-dashboard-container">
        {/* Top Navigation Bar */}
        

        {/* Two Main Divisions */}
        <div className="sd-main-content">
          {/* Left Division */}
          <div className="sd-left-division">
            {/* Upper Row: Schedule & Attendance */}
            <div className="sd-upper-row">
              {/* Today's Schedule */}
              <div className="sd-schedule-card">
                <h3>Today's Schedule</h3>
                <ul className="sd-schedule-list">
                  {scheduleData.map((item, index) => (
                    <li key={index} className="sd-schedule-item">
                      <div className="sd-schedule-color" style={{ backgroundColor: item.color }}></div>
                      <FaChevronRight className="sd-schedule-arrow" />
                      <div className="sd-schedule-details">
                        <span className="sd-schedule-subject">{item.subject}</span>
                        <span className="sd-schedule-time">{item.time}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Overall Attendance */}
              <div className="sd-attendance-card">
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
                <div className="sd-attendance-info">
                  <h4>Overall Attendance</h4>
                  {/* Horizontal Bar Chart */}
        <div style={{ width: "100%", height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendanceData} layout="vertical">
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis
                  type="category"
                  dataKey="subject"
                  width={100} // Increase width to prevent text cutting
                  tick={{
                    fontSize: 14, // Increase font size
                    fontWeight: "bold",
                    fill: "#800000", // Change color if needed
                  }}
                />
              <Tooltip
                cursor={{ fill: "rgba(200,200,200,0.3)" }}
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  padding: "10px",
                  border: "1px solid #800000",
                  textAlign: "center",
                }}
                labelStyle={{ fontSize: "14px", fontWeight: "bold", color: "#800000" }}
                itemStyle={{ fontSize: "12px", fontWeight: "bold", color: "#800000" }}
              />

              <Bar dataKey="attendance" barSize={10} radius={[10, 10, 10, 10]}>
                        {attendanceData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              entry.attendance < 50 ? "#e74c3c" : // Red for below 50%
                              entry.attendance <75 ? "#f39c12" : // Orange for exactly 75%
                              "#00b894" // Green for above 75%
                            }
                          />
                        ))}
                      </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
                </div>
              </div>
            </div>

            {/* Lower Row: Semester-wise GPA Visualization */}
            <div className="sd-gpa-container">
  {/* Overall CGPA Circular Progress */}
  <div className="sd-overall-cgpa">
    <CircularProgressbar
      value={(overallCGPA / 10) * 100}
      text={overallCGPA.toFixed(2)}
      styles={buildStyles({
        textSize: "16px",
        pathColor:
          overallCGPA < 6 ? "#e74c3c" : // Red for CGPA < 6
          overallCGPA < 7.5 ? "#f39c12" : // Orange for CGPA < 7.5
          "#00b894", // Green for CGPA ≥ 7.5
        textColor: "#333",
        trailColor: "#dfe6e9",
        strokeWidth: 18, // Increase thickness
      })}
    />
    <p className="sd-overall-text">Overall CGPA</p>

    {/* Dynamic Caption */}
    <p 
      className="sd-cgpa-caption"
      style={{
        color: overallCGPA < 6 ? "#e74c3c" : // Red
               overallCGPA < 7.5 ? "#f39c12" : // Orange
               "#00b894", // Green
      }}
    >
      {overallCGPA < 6 ? "Study Hard! You need to improve your CGPA." : 
       overallCGPA < 7.5 ? "You're Almost There! Keep pushing." : 
       "Excellent! You have a great CGPA."}
    </p>
  </div>



              {/* Semester Progress */}
<div className="sd-gpa-card">
  <h4 className="sd-gpa-heading">Semester Progress</h4>
  <div className="sd-gpa-vertical-container">
    {semesterGPA.map((sem, index) => {
      // Determine bar color based on GPA
      let barColor = "#3498db"; // Default: Blue for GPA ≥ 9
      if (sem.gpa < 6) {
        barColor = "#e74c3c"; // Red
      } else if (sem.gpa < 7.5) {
        barColor = "#f39c12"; // Orange
      } else if (sem.gpa < 10) {
        barColor = "##00b894"; // green
      } 

      return (
        <div key={index} className="sd-gpa-column">
          <span className="sd-gpa-sem">{sem.gpa}</span>
          <div className="sd-gpa-bar">
            <div
              className="sd-gpa-fill"
              style={{
                height: `${(sem.gpa / 10) * 100}%`,
                backgroundColor: barColor,
              }}
            ></div>
          </div>
          <span className="sd-gpa-value">{sem.sem}</span>
        </div>
      );
    })}
  </div>
</div>


            </div>
          </div>
            
          {/* Right Division (Announcements) */}
          <div className="sd-content">
            <div><h2 className="sd-heading">Announcements</h2></div>
          <nav className="sd-category-nav desktop-only">
        <button className="sd-category-btn active">All</button>
        <button className="sd-category-btn">Internships</button>
        <button className="sd-category-btn">Jobs</button>
        <button className="sd-category-btn">Internal Marks</button>
        <button className="sd-category-btn">Attendance</button>
      </nav>


          {/* Right Division (Announcements) */}
          
            <div className="sd-announcements">
              {announcements.map((item, index) => (
                <div className="sd-announcement-card" key={index} style={{ backgroundColor: item.color }}>
                  <div className="sd-announcement-header">
                    {/* Profile Section with Proper Alignment */}
                    <div className="sd-profile-section">
                      <img className="" src={userpic} alt="" />
                      <span className="sd-announcement-author">{item.faculty}</span>
                      <span className="sd-announcement-role">Faculty</span>
                    </div>
                    <span className="sd-announcement-time">12:00 22/06/2025</span>
                  </div>

                  {/* Announcement Content */}
                  <h3 className="sd-announcement-title">{item.title}</h3>
                  <p className="sd-announcement-text">{item.description}</p>
                  
                  {/* Read More Link - Enhanced Visibility */}
                  <a href="#" className="sd-view-more">Read more...</a>
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
