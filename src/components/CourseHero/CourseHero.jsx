import React from 'react';
import './CourseHero.css';
import { useAuth } from '../../context/AuthContext';

const CourseHero = ({ course, onEnroll, enrolling }) => {
  const { user } = useAuth(); // Get user to check their token balance

  return (
    <section className="course-hero-section">
      <div className="course-hero-container container">
        <div className="course-media">
          <img src={course.image} alt={course.title} className="cover-image" />
        </div>
        <div className="purchase-card">
          <div className="instructor-info">
            <img src="https://i.pravatar.cc/40?img=1" alt={course.author} />
            <span>{course.author}</span>
            <button className="follow-btn">Follow</button>
          </div>
          <h2 className="purchase-title">{course.title}</h2>
          <div className="purchase-rating">{course.rating || 0} ⭐</div>
          <div className="price-total">
            <span>Price</span>
            <span>💰 {course.price} Tokens</span>
          </div>
          <button 
            className="btn-buy-now" 
            onClick={onEnroll} 
            disabled={enrolling || (user && user.tokenBalance < course.price)}
          >
            {enrolling 
              ? 'Enrolling...' 
              : (user && user.tokenBalance < course.price) 
              ? 'Insufficient Tokens' 
              : 'Enroll Now'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CourseHero;