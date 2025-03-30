import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import "../styles/StudentMarks.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ViewMarks = () => {
  const [viewType, setViewType] = useState('table');
  const [semester, setSemester] = useState('');
  const [examType, setExamType] = useState('');

  const subjects = ['Maths', 'DSA', 'DBMS', 'OS', 'CN'];
  const marks = [27, 24, 29, 22, 25];
  const maxMarks = 30;

  const chartData = {
    labels: subjects,
    datasets: [
      {
        label: 'Marks',
        data: marks,
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderRadius: 5,
      }
    ]
  };

  return (
    <div className="container mt-4 mb-5">
      {/* 1. Header */}
      <h2 className="mb-4 text-center">🎓 View Marks</h2>
      <p className="text-center">Hello, Aditya! Here are your academic records.</p>

      {/* 2. Filter Panel */}
      <div className="row g-3 my-4">
        <div className="col-md-4">
          <select className="form-select" value={semester} onChange={(e) => setSemester(e.target.value)}>
            <option value="">Select Semester</option>
            <option value="2022-23 S1">2022-23 Semester 1</option>
            <option value="2022-23 S2">2022-23 Semester 2</option>
            <option value="2023-24 S1">2023-24 Semester 1</option>
          </select>
        </div>
        <div className="col-md-4">
          <select className="form-select" value={examType} onChange={(e) => setExamType(e.target.value)}>
            <option value="">Select Exam Type</option>
            <option value="Mid 1">Mid 1</option>
            <option value="Mid 2">Mid 2</option>
            <option value="Internal">Internal</option>
            <option value="EST">EST</option>
            <option value="All">All</option>
          </select>
        </div>
        <div className="col-md-4 text-end">
          <div className="btn-group">
            <button
              className={`btn btn-outline-primary ${viewType === 'table' ? 'active' : ''}`}
              onClick={() => setViewType('table')}
            >
              📋 Table
            </button>
            <button
              className={`btn btn-outline-success ${viewType === 'chart' ? 'active' : ''}`}
              onClick={() => setViewType('chart')}
            >
              📊 Chart
            </button>
          </div>
        </div>
      </div>

      {/* 3. Display Section */}
      {viewType === 'table' ? (
        <div className="table-responsive mb-4">
          <table className="table table-striped table-bordered text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>Subject</th>
                <th>Max Marks</th>
                <th>Marks Obtained</th>
                <th>Grade</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, idx) => {
                const score = marks[idx];
                const grade = score >= 27 ? 'A+' : score >= 24 ? 'A' : score >= 20 ? 'B' : 'C';
                const remark =
                  score >= 27 ? 'Excellent' : score >= 24 ? 'Good' : score >= 20 ? 'Fair' : 'Needs Improvement';
                return (
                  <tr key={idx}>
                    <td>{subject}</td>
                    <td>{maxMarks}</td>
                    <td>{score}</td>
                    <td>{grade}</td>
                    <td>{remark}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mb-4">
          <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
        </div>
      )}

      {/* 4. Past Records Accordion */}
      <div className="accordion" id="pastRecordsAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#past1">
              📁 2022-23 Semester 1
            </button>
          </h2>
          <div id="past1" className="accordion-collapse collapse" data-bs-parent="#pastRecordsAccordion">
            <div className="accordion-body">
              <p>Marks from Semester 1 go here...</p>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#past2">
              📁 2022-23 Semester 2
            </button>
          </h2>
          <div id="past2" className="accordion-collapse collapse" data-bs-parent="#pastRecordsAccordion">
            <div className="accordion-body">
              <p>Marks from Semester 2 go here...</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Notes/Legend */}
      <div className="mt-5">
        <h5>📌 Notes:</h5>
        <ul>
          <li><strong>EST</strong> = End Semester Test</li>
          <li><strong>A+</strong>: 90%+, <strong>A</strong>: 80–89%, <strong>B</strong>: 70–79%, <strong>C</strong>: below 70%</li>
          <li>Remarks are auto-generated based on performance</li>
        </ul>
      </div>
    </div>
  );
};

export default ViewMarks;
