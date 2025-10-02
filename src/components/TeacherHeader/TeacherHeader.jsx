import React from 'react';
import './TeacherHeader.css';

const TeacherHeader = ({ profile }) => {
  return (
    <div className="teacher-header">
      <div className="teacher-info-main">
        <img src={profile.avatar} alt={profile.name} className="teacher-avatar-large" />
        <div className="teacher-details">
          <h1>{profile.name}</h1>
          <p>{profile.title}</p>
          <p className="location">{profile.location}</p>
          <div className="teacher-tags">
            {profile.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
          </div>
        </div>
      </div>
      <div className="teacher-overview">
        <h2>Overview</h2>
        <p>{profile.overview}</p>
      </div>
      <div className="teacher-stats">
        <div className="stat-item"><span>Rating</span><strong>{profile.stats.rating}</strong></div>
        <div className="stat-item"><span>Reviews</span><strong>{profile.stats.reviews}</strong></div>
        <div className="stat-item"><span>Courses</span><strong>{profile.stats.courses}</strong></div>
        <div className="stat-item"><span>Students</span><strong>{profile.stats.students}</strong></div>
      </div>
    </div>
  );
};

export default TeacherHeader;