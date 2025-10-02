import React from 'react';
import './InfoCard.css';

const ProgressBar = ({ percentage }) => (
  <div className="progress-bar">
    <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
  </div>
);

const InfoCard = ({ profile }) => {
  return (
    <div className="info-card-container">
      <div className="card">
        <div className="card-header">
          <button className="btn-follow">Follow</button>
          <button className="btn-message">Message</button>
        </div>
      </div>
      <div className="card">
        <h3>{profile.ratingSummary.average}/5</h3>
        <div className="rating-stars">{"⭐".repeat(Math.round(profile.ratingSummary.average))}</div>
        <p className="review-count">({profile.ratingSummary.reviews} reviews)</p>
        <div className="rating-distribution">
          {profile.ratingSummary.distribution.map(dist => (
            <div key={dist.stars} className="rating-row">
              <span>{dist.stars}</span>
              <ProgressBar percentage={dist.percentage} />
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <h4>Certificates</h4>
        <p className="certificate-item">{profile.certificates[0]}</p>
      </div>
      <div className="card">
        <h4>Profile Link</h4>
        <div className="profile-link-box">
          <span>http://klara-design.com</span>
          <button>Copy Link</button>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;