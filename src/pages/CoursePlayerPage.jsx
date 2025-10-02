import React from 'react';
import DiscussionThread from '../components/DiscussionThread/DiscussionThread';
import CourseProgress from '../components/CourseProgress/CourseProgress';
import { coursePlayerData } from '../data/courses';
import './CoursePlayerPage.css';

const CoursePlayerPage = () => {
  return (
    // <Header /> and <Footer /> have been removed
    <main className="player-page-main container">
      <div className="player-layout">
        <div className="main-content">
          <div className="video-player-mock">
            <p>Video Player Placeholder</p>
          </div>
          <div className="course-title-header">
            <h2>{coursePlayerData.courseTitle}</h2>
            <div className="course-actions">
              <button>Share</button>
              <button>Save</button>
            </div>
          </div>
          <DiscussionThread discussions={coursePlayerData.discussions} />
        </div>
        <CourseProgress data={coursePlayerData} />
      </div>
    </main>
  );
};

export default CoursePlayerPage;