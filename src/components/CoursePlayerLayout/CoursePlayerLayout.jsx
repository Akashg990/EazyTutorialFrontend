import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import CommentSection from '../CommentSection/CommentSection';
import './CoursePlayerLayout.css';

const CoursePlayerLayout = ({ course, enrollment, onSectionComplete, courseAuthorId }) => {
  const { user } = useAuth();
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const handleMarkAsComplete = async (sectionId) => {
    try {
      const response = await fetch('/api/users/my-courses/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({ courseId: course._id, sectionId }),
      });

      if (response.ok) {
        onSectionComplete(sectionId);
      } else {
        console.error("Failed to mark section as complete");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const activeSection = course.sections[activeSectionIndex];
  const completedCount = enrollment.completedSections.length;
  const totalSections = course.sections.length;
  const progressPercentage = totalSections > 0 ? (completedCount / totalSections) * 100 : 0;

  return (
    <div className="course-player-layout container">
      <div className="player-main-content">
        <div className="video-wrapper">
          <iframe
            src={activeSection.videoUrl.replace("watch?v=", "embed/")}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={activeSection.title}
            key={activeSection.sectionId}
          ></iframe>
        </div>
        <div className="player-course-info">
          <h1>{activeSection.title}</h1>
          <p>{activeSection.description}</p>
          <CommentSection courseId={course._id} courseAuthorId={courseAuthorId} />
        </div>
      </div>
      <aside className="player-sidebar">
        <div className="lesson-list-card">
          <h3 className="course-title-sidebar">{course.title}</h3>
          <div className="lesson-progress">
            <span>{completedCount}/{totalSections} Completed</span>
            <div 
              className="progress-bar-container"
            >
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          <ul className="lesson-list">
            {course.sections.map((section, index) => {
              const isCompleted = enrollment.completedSections.includes(section.sectionId);
              const isActive = index === activeSectionIndex;
              return (
                <li 
                  key={section.sectionId} 
                  className={`${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveSectionIndex(index)}
                >
                  <div className="lesson-details">
                    <span className="lesson-check">✔</span>
                    <span className="lesson-title">{section.title}</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkAsComplete(section.sectionId);
                    }} 
                    disabled={isCompleted}
                    className="mark-complete-btn"
                  >
                    {isCompleted ? 'Completed' : 'Complete'}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default CoursePlayerLayout;