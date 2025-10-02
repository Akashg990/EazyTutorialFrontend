import React from 'react';
import './CoursePlayer.css';

const CoursePlayer = ({ course }) => {
  return (
    <div className="course-player-container container">
      <h1 className="course-player-title">{course.title}</h1>
      <div className="video-wrapper">
        <iframe
          src={course.videoUrl.replace("watch?v=", "embed/")} // Basic conversion for YouTube embed links
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={course.title}
        ></iframe>
      </div>
      <div className="course-player-details">
        <h2>About this lecture</h2>
        <p>{course.description}</p>
      </div>
    </div>
  );
};

export default CoursePlayer;