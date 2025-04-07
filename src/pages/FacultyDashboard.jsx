import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/FacultyDashboard.css";
import alumni from "../assets/alumni-icon.svg";

const FacultyDashboard = () => {
  // Schedule data
  const todaysSchedule = [
    { time: "9:00-10:00", subject: "CL", section: "A", room: "B-203" },
    { time: "10:00-11:00", subject: "EDC", section: "B", room: "Lab-3" },
    { time: "11:30-12:30", subject: "SS", section: "C", room: "A-101" },
    { time: "2:00-3:00", subject: "NT", section: "D", room: "C-305" },
    { time: "2:00-3:00", subject: "NT", section: "D", room: "C-305" },
    { time: "2:00-3:00", subject: "NT", section: "D", room: "C-305" },
    
  ];

  // Class progress data
  const classProgress = {
    totalClasses: 120,
    conducted: 85,
    pending: 35,
    percentage: Math.round((85 / 120) * 100),
    subjects: [
      { name: "CL", conducted: 22, total: 30, color: "#4E79A7" },
      { name: "EDC", conducted: 18, total: 30, color: "#F28E2B" },
      { name: "SS", conducted: 25, total: 30, color: "#E15759" },
      { name: "NT", conducted: 20, total: 30, color: "#76B7B2" }
    ]
  };

  // State management
  const [activeClass, setActiveClass] = useState(null);
  const [attendanceMode, setAttendanceMode] = useState("");
  const [selectedNumbers, setSelectedNumbers] = useState(new Set());

  // Handlers
  const handleMarkConducted = (classItem) => {
    setActiveClass(classItem);
    setSelectedNumbers(new Set());
    setAttendanceMode("");
  };

  const handleSubmitAttendance = () => {
    console.log(`Saved ${attendanceMode} for`, activeClass, selectedNumbers);
    setActiveClass(null);
  };

  // Circular Progress Component
  const CircularProgress = ({ percentage, conducted, pending, total }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className="fd-progress-container">
        <div className="fd-progress-circle-wrapper">
          <svg className="fd-progress-circle" width="100" height="100">
            <circle
              className="fd-progress-bg"
              cx="50"
              cy="50"
              r={radius}
              strokeWidth="8"
            />
            <circle
              className="fd-progress-fill"
              cx="50"
              cy="50"
              r={radius}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="fd-progress-text">
            <span className="fd-progress-percent">{percentage}%</span>
            <span className="fd-progress-details">{conducted}/{total}</span>
          </div>
        </div>
        <div className="fd-progress-stats">
          <div className="fd-progress-stat">
            <span className="fd-stat-dot fd-conducted"></span>
            <span>Conducted: {conducted}</span>
          </div>
          <div className="fd-progress-stat">
            <span className="fd-stat-dot fd-pending"></span>
            <span>Pending: {pending}</span>
          </div>
        </div>
      </div>
    );
  };

  // Horizontal Progress Bar Component
  const HorizontalProgressBar = ({ label, value, max, color }) => {
    const percentage = Math.round((value / max) * 100);
    
    return (
      <div className="fd-horizontal-progress">
        <div className="fd-progress-label">{label}</div>
        <div className="fd-progress-bar-container">
          <div 
            className="fd-progress-bar-fill" 
            style={{
              width: `${percentage}%`,
              backgroundColor: color
            }}
          ></div>
          
        </div>
      </div>
    );
  };

  // RollNumbers component
  const RollNumbersDisplay = ({ selectedNumbers, setSelectedNumbers, attendanceStatus }) => {
    const totalNumbers = 66;
    const emptyCells = 5;

    const rollNumbers = Array.from({ length: totalNumbers }, (_, i) =>
      String(i + 1).padStart(2, "0")
    );

    const handleSelect = (num) => {
      setSelectedNumbers((prev) => {
        const newSet = new Set(prev);
        newSet.has(num) ? newSet.delete(num) : newSet.add(num);
        return newSet;
      });
    };

    return (
      <div className="fd-roll-container">
        <div className="fd-roll-grid">
          {Array.from({ length: emptyCells }).map((_, index) => (
            <div className="fd-grid-item fd-grid-empty" key={`empty-${index}`}></div>
          ))}

          {rollNumbers.map((num) => (
            <div
              className={`fd-grid-item ${selectedNumbers.has(num) ? (attendanceStatus === "Absent" ? "fd-absent" : "fd-present") : ""}`}
              key={num}
              onClick={() => handleSelect(num)}
            >
              {num}
            </div>
          ))}
        </div>

        {selectedNumbers.size > 0 && attendanceStatus && (
          <div className="fd-absentees-container">
            <h3>{attendanceStatus === "Absent" ? "Absent Roll Numbers:" : "Present Roll Numbers:"}</h3>
            <p>{[...selectedNumbers].join(", ")}</p>
          </div>
        )}
      </div>
    );
  };

  // Attendance Modal component
  const AttendanceModal = ({ 
    activeClass, 
    onClose, 
    selectedNumbers, 
    setSelectedNumbers,
    onSubmitAttendance 
  }) => {
    return (
      <div className="fd-modal-overlay">
        <div className="fd-modal">
          <h3>Mark Attendance for {activeClass.subject} - Sec {activeClass.section}</h3>
          
          <div className="fd-mode-selector">
            <button 
              className={`fd-mode-btn ${attendanceMode === 'Present' ? 'active' : ''}`}
              onClick={() => setAttendanceMode('Present')}
            >
              Mark Presenties
            </button>
            <button 
              className={`fd-mode-btn ${attendanceMode === 'Absent' ? 'active' : ''}`}
              onClick={() => setAttendanceMode('Absent')}
            >
              Mark Absenties
            </button>
          </div>

          {attendanceMode && (
            <>
              <RollNumbersDisplay 
                selectedNumbers={selectedNumbers}
                setSelectedNumbers={setSelectedNumbers}
                attendanceStatus={attendanceMode}
              />
              
              <div className="fd-modal-actions">
                <button className="fd-modal-submit" onClick={onSubmitAttendance}>
                  Save Attendance
                </button>
                <button className="fd-modal-cancel" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fd-dashboard">
      <div className="fd-layout-container">
        {/* Left Division - Today's Schedule */}
        <div className="fd-left-division">
          <div className="fd-schedule-container">
            <h2 className="fd-section-title">Today's Schedule</h2>
            <div className="fd-schedule-list">
              {todaysSchedule.map((classItem, index) => (
                <div className="fd-schedule-item" key={index}>
                  <div className="fd-schedule-time">{classItem.time}</div>
                  <div className="fd-schedule-details">
                    <span className="fd-schedule-subject">{classItem.subject}</span>
                    <span className="fd-schedule-section">Sec {classItem.section}</span>
                    <span className="fd-schedule-room">{classItem.room}</span>
                  </div>
                  <div className="fd-action-buttons">
                    <button 
                      className="fd-conducted-btn"
                      onClick={() => handleMarkConducted(classItem)}
                    >
                      Conducted
                    </button>
                    <button className="fd-not-conducted-btn">
                      Not Conducted
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Division - Statistics Dashboard */}
        <div className="fd-right-division">
          <div className="fd-stats-dashboard">
            <h2 className="fd-section-title">Institution Overview</h2>
            <div className="fd-stats-grid">
              <div className="fd-stat-card" style={{ backgroundColor: '#E5E5E5' }}>
                <div className="fd-stat-icon">
                  <img src="/assets/student-icon.png" alt="Students" />
                </div>
                <div className="fd-stat-content">
                  <div className="fd-stat-value">1,440</div>
                  <div className="fd-stat-label">Students</div>
                  <div className="fd-stat-trend">↑ 5.2%</div>
                </div>
              </div>

              <div className="fd-stat-card" style={{ backgroundColor: '#FFD3DA' }}>
                <div className="fd-stat-icon">
                  <img src="/assets/faculty-icon.png" alt="Faculty" />
                </div>
                <div className="fd-stat-content">
                  <div className="fd-stat-value">42</div>
                  <div className="fd-stat-label">Faculty</div>
                  <div className="fd-stat-trend">↑ 2 new</div>
                </div>
              </div>

              <div className="fd-stat-card" style={{ backgroundColor: '#FFD89C' }}>
                <div className="fd-stat-icon">
                  <img src={alumni} alt="Alumni" />
                </div>
                <div className="fd-stat-content">
                  <div className="fd-stat-value">2,850</div>
                  <div className="fd-stat-label">Alumni</div>
                  <div className="fd-stat-trend">98% employed</div>
                </div>
              </div>
            </div>

            {/* Class Progress Section */}
            <div className="fd-class-progress">
              <h3 className="fd-progress-title">Semester Class Progress</h3>
              <div className="fd-progress-content">
                <div className="fd-progress-left">
                  <CircularProgress 
                    percentage={classProgress.percentage}
                    conducted={classProgress.conducted}
                    pending={classProgress.pending}
                    total={classProgress.totalClasses}
                  />
                </div>
                <div className="fd-progress-right">
                  {classProgress.subjects.map((subject, index) => (
                    <HorizontalProgressBar
                      key={index}
                      label={subject.name}
                      value={subject.conducted}
                      max={subject.total}
                      color={subject.color}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Modal */}
      {activeClass && (
        <AttendanceModal
          activeClass={activeClass}
          onClose={() => setActiveClass(null)}
          selectedNumbers={selectedNumbers}
          setSelectedNumbers={setSelectedNumbers}
          onSubmitAttendance={handleSubmitAttendance}
        />
      )}
    </div>
  );
};

export default FacultyDashboard;