import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';
import { FiFilter, FiBarChart2, FiGrid, FiInfo, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import "../styles/StudentMarks.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ViewMarks = () => {
  const [viewType, setViewType] = useState('table');
  const [semester, setSemester] = useState('2023-24 S1');
  const [examType, setExamType] = useState('Mid 1');
  const [currentExamIndex, setCurrentExamIndex] = useState(0);

  // Sample data structure
  const marksData = {
    '2023-24 S1': {
      'Mid 1': {
        subjects: ['Maths', 'DSA', 'DBMS', 'OS', 'CN'],
        marks: [27, 24, 29, 22, 25],
        maxMarks: 30,
        date: '2023-10-15'
      },
      'Mid 2': {
        subjects: ['Maths', 'DSA', 'DBMS', 'OS', 'CN', 'OOP'],
        marks: [28, 26, 24, 25, 23, 27],
        maxMarks: 30,
        date: '2023-12-05'
      }
    },
    '2022-23 S2': {
      'EST': {
        subjects: ['Maths', 'DSA', 'DBMS', 'OS'],
        marks: [85, 78, 82, 80],
        maxMarks: 100,
        date: '2023-05-20'
      }
    }
  };

  // Get all exams including current one for carousel
  const allExams = [
    // Current exam first
    {
      ...marksData[semester]?.[examType] || 
      marksData[semester]?.[Object.keys(marksData[semester])[0]] || 
      marksData[Object.keys(marksData)[0]]?.[Object.keys(marksData[Object.keys(marksData)[0]])[0]],
      semester,
      examType,
      isCurrent: true
    },
    // Then previous exams
    ...Object.entries(marksData).flatMap(([sem, exams]) => 
      Object.entries(exams)
        .filter(([exam]) => !(sem === semester && exam === examType))
        .map(([exam, data]) => ({
          ...data,
          semester: sem,
          examType: exam,
          isCurrent: false
        })
      )
    )
  ].filter(exam => exam.subjects && exam.marks && exam.maxMarks);

  const currentExamData = allExams[currentExamIndex];
  const { subjects = [], marks = [], maxMarks = 30, date = '', isCurrent } = currentExamData || {};

  // Calculate overall performance for current exam
  const totalMarks = marks.reduce((sum, mark) => sum + mark, 0);
  const percentage = Math.round((totalMarks / (subjects.length * maxMarks)) * 100);
  const overallGrade = percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B' : 'C';

  // Chart data
  const chartData = {
    labels: subjects,
    datasets: [
      {
        label: 'Marks Obtained',
        data: marks,
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderRadius: 5,
      },
      {
        label: 'Max Marks',
        data: Array(subjects.length).fill(maxMarks),
        backgroundColor: 'rgba(209, 213, 219, 0.5)',
        borderRadius: 5,
      }
    ]
  };

  // Performance rating stars
  const renderStars = () => {
    const starCount = Math.floor(percentage / 20);
    const hasHalfStar = percentage % 20 >= 10;
    
    return (
      <div className="sm-stars-container">
        {[...Array(5)].map((_, i) => {
          if (i < starCount) return <FaStar key={i} className="text-warning" />;
          if (i === starCount && hasHalfStar) return <FaStarHalfAlt key={i} className="text-warning" />;
          return <FaRegStar key={i} className="text-warning" />;
        })}
        <span className="sm-stars-percentage">{percentage}%</span>
      </div>
    );
  };

  // Navigation for carousel
  const nextExam = () => {
    setCurrentExamIndex((prevIndex) => 
      prevIndex === allExams.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevExam = () => {
    setCurrentExamIndex((prevIndex) => 
      prevIndex === 0 ? allExams.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="sm-container mt-4 mb-5 px-4">
      {/* Filter Panel */}
      <div className="sm-card-body card-body">
        <div className="row g-3">
          <div className="col-md-5">
            <label className="sm-form-label form-label">Semester</label>
            <select 
              className="sm-form-select form-select" 
              value={semester} 
              onChange={(e) => {
                setSemester(e.target.value);
                setCurrentExamIndex(0); // Reset to first exam when semester changes
              }}
            >
              {Object.keys(marksData).map(sem => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>
          <div className="col-md-5">
            <label className="sm-form-label form-label">Exam Type</label>
            <select 
              className="sm-form-select form-select" 
              value={examType} 
              onChange={(e) => {
                setExamType(e.target.value);
                setCurrentExamIndex(0); // Reset to first exam when exam type changes
              }}
            >
              {semester && Object.keys(marksData[semester]).map(exam => (
                <option key={exam} value={exam}>{exam}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <div className="sm-view-toggle btn-group w-100">
              <button
                className={`btn ${viewType === 'table' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setViewType('table')}
                title="Table view"
              >
                <FiGrid className="me-1" /> Table
              </button>
              <button
                className={`btn ${viewType === 'chart' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setViewType('chart')}
                title="Chart view"
              >
                <FiBarChart2 className="me-1" /> Chart
              </button>
            </div>
          </div>
        </div>
        {date && (
          <div className="sm-exam-date mt-3 text-muted small">
            <FiInfo className="sm-icon me-1" /> Exam conducted on: {new Date(date).toLocaleDateString()}
          </div>
        )}
      </div>

      {/* Display Section */}
      {viewType === 'table' ? (
        <div className="sm-content-card card shadow-sm mb-4">
          <div className="sm-card-header card-header bg-light d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              {isCurrent ? 'Current Exam Details' : 'Previous Exam Details'} - {currentExamData.semester} {currentExamData.examType}
            </h5>
            {allExams.length > 1 && (
              <div className="sm-carousel-nav">
                <button onClick={prevExam} className="btn btn-sm btn-outline-secondary">
                  <FiChevronLeft />
                </button>
                <span className="mx-2">
                  {currentExamIndex + 1} / {allExams.length}
                </span>
                <button onClick={nextExam} className="btn btn-sm btn-outline-secondary">
                  <FiChevronRight />
                </button>
              </div>
            )}
          </div>
          <div className="sm-card-body card-body p-0">
            <div className="table-responsive">
              <table className="sm-table table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Subject</th>
                    <th className="text-center">Marks</th>
                    <th className="text-center">Max</th>
                    <th className="text-center">%</th>
                    <th className="text-center">Grade</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject, idx) => {
                    const score = marks[idx];
                    const subjectPercentage = Math.round((score / maxMarks) * 100);
                    const grade = subjectPercentage >= 90 ? 'A+' : 
                                 subjectPercentage >= 80 ? 'A' : 
                                 subjectPercentage >= 70 ? 'B' : 'C';
                    const remark = subjectPercentage >= 90 ? 'Excellent' : 
                                    subjectPercentage >= 80 ? 'Good' : 
                                    subjectPercentage >= 70 ? 'Fair' : 'Needs Improvement';
                    
                    return (
                      <tr key={idx}>
                        <td><strong>{subject}</strong></td>
                        <td className="text-center">
                          <span className={`sm-badge badge ${subjectPercentage >= 70 ? 'bg-success' : subjectPercentage >= 50 ? 'bg-warning' : 'bg-danger'}`}>
                            {score}
                          </span>
                        </td>
                        <td className="text-center">{maxMarks}</td>
                        <td className="text-center">{subjectPercentage}%</td>
                        <td className="text-center">
                          <span className={`sm-badge badge ${grade === 'A+' ? 'bg-primary' : grade === 'A' ? 'bg-info' : grade === 'B' ? 'bg-warning' : 'bg-danger'}`}>
                            {grade}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            {subjectPercentage < 70 && <FiInfo className="sm-icon text-warning me-1" />}
                            {remark}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="sm-content-card card shadow-sm mb-4">
          <div className="sm-card-header card-header bg-light">
            <h5 className="mb-0">Performance Chart</h5>
          </div>
          <div className="sm-card-body card-body">
            <div className="sm-chart-container" style={{ height: '400px' }}>
              <Bar 
                data={chartData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: { 
                    legend: { 
                      position: 'top',
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          const label = context.dataset.label || '';
                          const value = context.raw;
                          const percentage = Math.round((value / maxMarks) * 100);
                          return `${label}: ${value} (${percentage}%)`;
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: maxMarks,
                      title: {
                        display: true,
                        text: 'Marks'
                      }
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'Subjects'
                      }
                    }
                  }
                }} 
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ViewMarks;