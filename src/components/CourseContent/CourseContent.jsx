import React, { useState } from 'react';
import ReviewCard from '../ReviewCard/ReviewCard';
import CourseCard from '../CourseCard/CourseCard';
// We no longer need to import recommendedCourses from data

const CourseContent = ({ course }) => {
  const [activeTab, setActiveTab] = useState('description');
  
  // Placeholder data since this isn't in our DB yet
  const placeholderReviews = [
    { id: 1, name: "Jay Rutherford", rating: 5, date: "12:00 PM", text: "Veniam mollit et veniam ea officia nisi minim fugiat minim consequat dolor pariatur.", avatar: "https://i.pravatar.cc/40?img=2" },
    { id: 2, name: "Annie Haley", rating: 4, date: "04:00 PM", text: "Nostrud excepteur magna id est quis in aliqua consequat.", avatar: "https://i.pravatar.cc/40?img=3" },
  ];
  const placeholderBenefits = [
    "14 hours on-demand video", "Full lifetime access", "Native teacher", "Certificate of complete"
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="tab-pane">
            <h3>Class description</h3>
            <p>{course.description}</p>
          </div>
        );
      case 'benefits':
        return (
          <div className="tab-pane">
            <h3>Benefits</h3>
            <ul className="benefits-list">
              {placeholderBenefits.map((benefit, index) => (
                <li key={index}>✔️ {benefit}</li>
              ))}
            </ul>
          </div>
        );
      case 'reviews':
        return (
          <div className="tab-pane">
            <h3>Reviews (2)</h3>
            {placeholderReviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        );
      // 'Related courses' tab can be added back later
      default:
        return null;
    }
  };

  return (
    <section className="course-content-section container">
      <div className="tabs">
        <button onClick={() => setActiveTab('description')} className={activeTab === 'description' ? 'active' : ''}>Class description</button>
        <button onClick={() => setActiveTab('benefits')} className={activeTab === 'benefits' ? 'active' : ''}>Benefits</button>
        <button onClick={() => setActiveTab('reviews')} className={activeTab === 'reviews' ? 'active' : ''}>Reviews</button>
      </div>
      <div className="tab-content">
        {renderContent()}
      </div>
    </section>
  );
};

export default CourseContent;