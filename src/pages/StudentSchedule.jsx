import React from 'react';
import '../styles/StudentSchedule.css'; // for custom styles
import 'bootstrap/dist/css/bootstrap.min.css';

const scheduleData = {
  Monday: ["Math", "Physics", "Break", "Electronics", "Workshop"],
  Tuesday: ["English", "Math", "Break", "C Programming", "Lab"],
  Wednesday: ["Digital", "Electronics", "Break", "Math", "Library"],
  Thursday: ["Physics", "Lab", "Break", "English", "Workshop"],
  Friday: ["Math", "Digital", "Break", "C Programming", "Sports"],
  Saturday: ["NSS", "Soft Skills", "Break", "Free Hour", "Seminar"],
};

const timeSlots = ["9:00–10:00", "10:00–11:00", "11:00–11:15", "11:15–12:15", "12:15–1:15"];

const SchedulePage = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Weekly Schedule</h2>
      <div className="table-responsive">
        <table className="table table-bordered text-center schedule-table">
          <thead className="thead-dark">
            <tr>
              <th>Day</th>
              {timeSlots.map((slot, idx) => (
                <th key={idx}>{slot}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(scheduleData).map(([day, subjects]) => (
              <tr key={day}>
                <td className="font-weight-bold">{day}</td>
                {subjects.map((subject, idx) => (
                  <td key={idx} className={subject === "Break" ? "bg-warning" : ""}>
                    {subject}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchedulePage;
