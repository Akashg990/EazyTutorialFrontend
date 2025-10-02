import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import defaultHeroImage from '../../assets/course.png'; // A fallback image

const Hero = ({ featuredCourse }) => {
  return (
    <section className="hero-section">
      <div className="hero-container container">
        <div className="hero-content">
          {/* If a featured course exists, display its details */}
          {featuredCourse ? (
            <>
              <p className="hero-eyebrow">Featured Course</p>
              <h1 className="hero-title">{featuredCourse.title}</h1>
              <p className="hero-description">
                By {featuredCourse.author} | Category: {featuredCourse.category}
              </p>
              <Link to={`/course/${featuredCourse._id}`} className="hero-button">
                Explore Course
              </Link>
            </>
          ) : (
            // If no featured course is set, display a generic message
            <>
              <h1 className="hero-title">Unlock Your Potential</h1>
              <p className="hero-description">
                Discover a world of knowledge with our expert-led courses.
              </p>
              <button className="hero-button">Explore Courses</button>
            </>
          )}
        </div>
        <div className="hero-image-container">
          <img 
            src={featuredCourse ? featuredCourse.image : defaultHeroImage} 
            alt="Featured Course" 
            className="hero-image" 
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;