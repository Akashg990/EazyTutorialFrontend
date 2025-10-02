import React from 'react';
import './CourseProgress.css';

const CourseProgress = ({ data }) => {
  const progressPercentage = (data.completedLessons / data.totalLessons) * 100;

  return (
    <aside className="course-progress-sidebar">
      <div className="progress-card">
        <div className="progress-header">
          <span>{data.completedLessons}/{data.totalLessons} Completed</span>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
        <h4>Sessions</h4>
        <ul className="lesson-list">
          {data.lessons.map(lesson => (
            <li key={lesson.id} className={lesson.isCompleted ? 'completed' : ''}>
              <span className="lesson-check">✔</span> {lesson.title}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default CourseProgress;