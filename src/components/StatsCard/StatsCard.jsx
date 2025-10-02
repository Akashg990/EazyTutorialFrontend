import React from 'react';
import './StatsCard.css';

const StatsCard = ({ stats }) => {
  return (
    <div className="stats-card">
      <h4>Learning Statistics</h4>
      <div className="stat-item">
        <span>Courses in Progress</span>
        <strong>{stats.coursesInProgress}</strong>
      </div>
      <div className="stat-item">
        <span>Courses Completed</span>
        <strong>{stats.coursesCompleted}</strong>
      </div>
      <div className="stat-item">
        <span>Certificates Earned</span>
        <strong>{stats.certificatesEarned}</strong>
      </div>
    </div>
  );
};

export default StatsCard;