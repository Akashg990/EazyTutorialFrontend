import React from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  const getTagClass = (type) => {
    switch (type) {
      case 'bestseller': return 'tag-bestseller';
      case 'discount': return 'tag-discount';
      default: return 'tag-normal';
    }
  };

  return (
    <Link to={`/course/${course._id}`} className="course-card">
      <div className="card-image-container">
        <img 
          src={course.image || '/placeholder-course.png'} 
          alt={course.title || 'Course'} 
          className="card-image" 
        />
        {course.tag && (
          <span className={`card-tag ${getTagClass(course.tagType)}`}>
            {course.tag}
          </span>
        )}
      </div>
      
      <div className="card-content">
        <p className="card-category">{course.category || 'General'}</p>
        <h3 className="card-title">{course.title || 'Untitled Course'}</h3>
        
        <div className="card-rating">
          <span className="rating-score">{course.rating?.toFixed(1) || 0} ⭐</span>
          <span className="rating-reviews">({course.reviews || 0})</span>
        </div>
        
        <p className="card-price">💰 {course.price || 0} Tokens</p>
      </div>
    </Link>
  );
};

export default CourseCard;
