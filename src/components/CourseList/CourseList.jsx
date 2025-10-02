import React from 'react';
import CourseCard from '../CourseCard/CourseCard';
import './CourseList.css';

const CourseList = ({ title, courses }) => {
  return (
    <section className="course-list-section container">
      <div className="list-header">
        <h2>{title}</h2>
        <a href="#" className="view-all-link">View all &gt;</a>
      </div>
      <div className="course-grid">
        {courses.map(course => (
          // --- THE FIX IS HERE ---
          // Changed from course.id to course._id
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </section>
  );
};

export default CourseList;