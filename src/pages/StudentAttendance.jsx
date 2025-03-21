import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
  ResponsiveContainer,
} from "recharts";
import "react-circular-progressbar/dist/styles.css";
import { Button, Form, Card,Row,Col } from "react-bootstrap";
import "../styles/StudentAttendance.css"; // Custom CSS file for styling

const StudentAttendance = () => {
  const [attendanceData, setAttendanceData] = useState({
    overall: 0,
    subjects: [
      { name: "Math", attendance: 0 },
      { name: "Physics", attendance: 0 },
      { name: "Chemistry", attendance: 0 },
      { name: "English", attendance: 0 },
    ],
  });

  const actualAttendance = {
    overall: 85, // Overall attendance percentage
    subjects: [
      { name: "Math", attendance: 90 },
      { name: "Physics", attendance: 80 },
      { name: "Chemistry", attendance: 75 },
      { name: "English", attendance: 88 },
    ],
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setAttendanceData((prev) => {
        let updatedOverall =
          prev.overall < actualAttendance.overall
            ? prev.overall + 1
            : actualAttendance.overall;

        let updatedSubjects = prev.subjects.map((sub, index) => ({
          ...sub,
          attendance:
            sub.attendance < actualAttendance.subjects[index].attendance
              ? sub.attendance + 1
              : actualAttendance.subjects[index].attendance,
        }));

        return { overall: updatedOverall, subjects: updatedSubjects };
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sa-container sa-student-attendance">
      <div className="row d-flex align-items-center justify-content-between upper-section">
        
        {/* Card for Overall Attendance & Subject-wise Attendance */}
        <Card className="col-md-7 sa-attendance-card">
          <Card.Body className="d-flex align-items-center">
            {/* Overall Attendance (Circular Progress) */}
            <div className="text-center" style={{ width: "35%" }}>
              <h5>Overall Attendance</h5>
              <div style={{ width: 100, margin: "0 auto" }}>
                <CircularProgressbar
                  value={attendanceData.overall}
                  text={`${attendanceData.overall}%`}
                  styles={buildStyles({
                    pathColor: attendanceData.overall > 75 ? "green" : "red",
                    textSize: "14px",
                    textColor: "#000",
                  })}
                />
              </div>
            </div>

            {/* Subject-wise Attendance (Horizontal Bars) */}
            <div className="sa-subject-attendance" style={{ width: "65%" }}>
              <h5>Subject-wise Attendance</h5>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart
                  layout="vertical"
                  data={attendanceData.subjects}
                  margin={{ left: 40 }}
                >
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Bar dataKey="attendance">
                    {attendanceData.subjects.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.attendance > 75 ? "#4CAF50" : "#FF9800"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card.Body>
        </Card>

        {/* Card for Export Attendance Section */}
         {/* Card for Export Attendance Section */}
         <Card className="col-md-4 sa-export-card">
          <Card.Body>
            <h5 className="text-center">Export Attendance Data</h5>
            <Form>
              <Row>
                {/* Export Type Dropdown */}
                <Col md={6}>
                  <Form.Group controlId="exportType">
                    <Form.Label>Select Export Type</Form.Label>
                    <Form.Control as="select">
                      <option>Month-wise Attendance</option>
                      <option>Subject-wise Attendance</option>
                      <option>Till-Date Attendance</option>
                      <option>Custom Date Range</option>
                    </Form.Control>
                  </Form.Group>
                </Col>

                {/* Select Date Input */}
                <Col md={6}>
                  <Form.Group controlId="dateSelection">
                    <Form.Label>Select Date</Form.Label>
                    <Form.Control type="month" />
                  </Form.Group>
                </Col>
              </Row>

              {/* Custom Date Range Inputs in the same row */}
              <Row>
                <Col md={6}>
                  <Form.Group controlId="customDateStart">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="customDateEnd">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="date" />
                  </Form.Group>
                </Col>
              </Row>

              {/* Export Buttons Side by Side */}
              <Row className="mt-2">
                <Col md={6}>
                  <Button variant="primary" className="w-100">
                    Export as PDF
                  </Button>
                </Col>
                <Col md={6}>
                  <Button variant="success" className="w-100">
                    Export as CSV
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default StudentAttendance;
