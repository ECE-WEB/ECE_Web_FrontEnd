import React, { useState } from 'react';
import '../styles/FacultyAnnouncements.css';
import profilePic from '../assets/profilePic.svg';

const labelTags = ['All', 'Internal Marks', 'Attendance', 'Internships', 'Jobs'];

const Announcements = () => {
  const [showModal, setShowModal] = useState(false);

  const [announcements] = useState([
    {
      id: 1,
      faculty: 'Faculty Name',
      role: 'Faculty',
      title: 'XYZ Internship',
      description: 'Internship vacancies in XYZ company for UG students. Apply now.',
      color: '#DDE3FF',
      dotColor: '#4B56D2',
      profilePic: 'https://via.placeholder.com/40',
    },
    {
      id: 2,
      faculty: 'Faculty Name',
      role: 'Faculty',
      title: 'XYZ Internship',
      description: 'Internship vacancies in XYZ company for UG students. Apply now.',
      color: '#FFF7D9',
      dotColor: '#FFD93D',
      profilePic: 'https://via.placeholder.com/40',
    },
    {
      id: 3,
      faculty: 'Faculty Name',
      role: 'Faculty',
      title: 'XYZ Internship',
      description: 'Internship vacancies in XYZ company for UG students. Apply now.',
      color: '#FFE5E5',
      dotColor: '#FF6363',
      profilePic: 'https://via.placeholder.com/40',
    },
    {
      id: 4,
      faculty: 'Faculty Name',
      role: 'Faculty',
      title: 'XYZ Internship',
      description: 'Internship vacancies in XYZ company for UG students. Apply now.',
      color: '#E6FAF5',
      dotColor: '#2CD3B2',
      profilePic: 'https://via.placeholder.com/40',
    },
  ]);

  return (
    <div className="announcements-container">
      {/* Filter Row */}
      <div className="filter-row">
        <div className="tags">
          {labelTags.map((label, idx) => (
            <button key={idx} className={`tag-btn ${idx === 0 ? 'active' : ''}`}>
              {label}
            </button>
          ))}
        </div>
        <button className="announcement-btn" onClick={() => setShowModal(true)}>
          <span className="plus">＋</span> Announcement
        </button>
      </div>

      {/* Modal */}
      {showModal && (
  <div className="modal-overlay">
    <div className="modal">
      <div className="modal-header">
        <h2>Give an Announcement</h2>
      </div>
      <form>
        <label className="modal-label">Title</label>
        <input type="text" className="modal-input" placeholder="e.g., ABC Internship" />

        <label className="modal-label">Description</label>
        <textarea className="modal-input" rows="3" placeholder="e.g., Internship for UG students. Apply now."></textarea>

        <label className="modal-label">File to Upload</label>
        <input type="text" className="modal-input" placeholder="e.g., Notification PDF" />

        <label className="modal-label">Due Date</label>
        <input type="text" className="modal-input" placeholder="e.g., March 31, 2025" />

        <label className="modal-label">Suggestions</label>
        <input type="text" className="modal-input" placeholder="e.g., Apply quickly, limited seats" />

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.2rem' }}>
          <button type="submit" className="send-btn">
            Send
          </button>
          <button type="button" className="send-btn" style={{ background: '#ccc', color: '#333' }} onClick={() => setShowModal(false)}>
            Close
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      {/* Cards */}
      {announcements.map((a) => (
        <div className="announcement-card" key={a.id} style={{ backgroundColor: a.color }}>
          <div className="announcement-top">
            <div className="top-left">
              <div className="faculty-details">
                <img src={profilePic} alt="Profile" className="profile-pic" />
                <div className="faculty-info">
                  <strong style={{ color: a.dotColor }}>{a.faculty}</strong>
                </div>
              </div>
              <div className="announcement-title">
                <h5>{a.title}</h5>
              </div>
            </div>
            <span className="role">{a.role}</span>
          </div>
          <p>{a.description}</p>
          <div className="read-more" style={{ color: a.dotColor }}>
            Read more..
          </div>
        </div>
      ))}
    </div>
  );
};

export default Announcements;
