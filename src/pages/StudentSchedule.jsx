import React from 'react';
import '../styles/StudentSchedule.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const scheduleData = {
  Monday: ["EMWG", "DSD", "LIC", "CS-1", "", "LIC LAB", "", ""],
  Tuesday: ["FAI", "", "LIC", "DSD", "", "CS-1 LAB", "", ""],
  Wednesday: ["", "", "DSD LAB", "", "", "EMWG", "CS-1", "LIC"],
  Thursday: ["EMWG", "", "CS-1", "", "", "CS-1", "DSD", "EMWG"],
  Friday: ["Robotics (Theory+Lab)", "", "", "", "", "CS-1", "DSD", "EMWG"],
  Saturday: ["", "", "", "", "", "", "", ""],
};

const timeSlots = [
  "8:30–9:30 AM",
  "9:30–10:30 AM",
  "10:40–11:40 AM",
  "11:40–12:40 PM",
  "Lunch (12:40–1:30 PM)",
  "1:30–2:30 PM",
  "2:30–3:30 PM",
  "3:30–4:30 PM",
];

const SchedulePage = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Weekly Schedule - Section B</h2>
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
            {Object.entries(scheduleData).map(([day, periods]) => (
              <tr key={day}>
                <td className="font-weight-bold">{day}</td>
                {periods.map((subject, idx) => (
                  <td
                    key={idx}
                    className={
                      subject.toLowerCase().includes("lab")
                        ? "bg-info text-white"
                        : subject.toLowerCase().includes("lunch")
                        ? "bg-warning"
                        : ""
                    }
                  >
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
