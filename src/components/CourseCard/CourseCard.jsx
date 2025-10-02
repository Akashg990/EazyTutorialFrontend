import React from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  const getTagClass = (type) => {
    if (type === 'bestseller') return 'tag-bestseller';
    if (type === 'discount') return 'tag-discount';
    return 'tag-normal';
  };

  return (
    <Link to={`/course/${course._id}`} className="course-card">
      <div className="card-image-container">
        <img src={course.image} alt={course.title} className="card-image" />
        {course.tag && <span className={`card-tag ${getTagClass(course.tagType)}`}>{course.tag}</span>}
      </div>
      <div className="card-content">
        <p className="card-category">{course.category}</p>
        <h3 className="card-title">{course.title}</h3>
        <div className="card-rating">
          <span className="rating-score">{course.rating || 0} ⭐</span>
          <span className="rating-reviews">({course.reviews || 0})</span>
        </div>
        <p className="card-price">💰 {course.price} Tokens</p>
      </div>
    </Link>
  );
};

export default CourseCard;