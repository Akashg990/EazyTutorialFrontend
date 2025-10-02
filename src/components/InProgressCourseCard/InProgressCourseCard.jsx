import React from 'react';
import { Link } from 'react-router-dom';
import './InProgressCourseCard.css';

// Accept the new 'progress' prop
const InProgressCourseCard = ({ course, progress }) => {
  return (
    <Link to={`/course/${course._id}`} className="in-progress-card">
      <img src={course.image} alt={course.title} className="ip-card-image" />
      <div className="ip-card-content">
        <h3 className="ip-card-title">{course.title}</h3>
        <p className="ip-card-author">{course.author}</p>
        <div className="progress-bar-container">
          {/* Use the dynamic progress value for the width */}
          <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
        {/* Use the dynamic progress value for the text */}
        <p className="ip-card-progress">{Math.round(progress)}% Complete</p>
        <div className="ip-card-button">
          Continue Learning
        </div>
      </div>
    </Link>
  );
};

export default InProgressCourseCard;