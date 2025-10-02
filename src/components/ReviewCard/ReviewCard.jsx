import React from 'react';
import './ReviewCard.css';

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <img src={review.avatar} alt={review.name} className="review-avatar" />
      <div className="review-content">
        <div className="review-header">
          <span className="review-name">{review.name}</span>
          <span className="review-meta">Rated {review.rating} ⭐ · {review.date}</span>
        </div>
        <p className="review-text">{review.text}</p>
      </div>
    </div>
  );
};

export default ReviewCard;