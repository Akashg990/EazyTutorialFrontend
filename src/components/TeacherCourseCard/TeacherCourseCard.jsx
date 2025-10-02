import React from 'react';
import './TeacherCourseCard.css';

const TeacherCourseCard = ({ course }) => {
  const renderStars = (rating) => "⭐".repeat(rating);

  return (
    <div className="teacher-course-card">
      <img src={course.image} alt={course.title} className="tcc-image" />
      <div className="tcc-content">
        <h3>{course.title}</h3>
        <div className="tcc-meta">
          <span>{course.date}</span>
          <span className="tcc-rating">{renderStars(course.rating)}</span>
        </div>
        {course.tag && <span className="tcc-tag">{course.tag}</span>}
        <p className="tcc-description">
          Anim aliqua fugiat consequat minim in sunt aute aliquip labore sint consectetur.
        </p>
      </div>
      <div className="tcc-actions">
        <p className="tcc-price">${course.price}</p>
        <button className="btn-add">Add to cart</button>
        <button className="btn-buy">Buy now</button>
      </div>
    </div>
  );
};

export default TeacherCourseCard;