import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import TeacherHeader from '../components/TeacherHeader/TeacherHeader';
import TeacherCourseCard from '../components/TeacherCourseCard/TeacherCourseCard';
import InfoCard from '../components/InfoCard/InfoCard';
import { teacherProfile } from '../data/courses';
import './TeacherProfilePage.css';

const TeacherProfilePage = () => {
  return (
    // <Header /> and <Footer /> have been removed
    <main>
      <Breadcrumbs items={["Home", "UI/UX Design", "Teacher's profile"]} />
      <div className="profile-layout container">
        <div className="profile-main-content">
          <TeacherHeader profile={teacherProfile} />
          <h2>Courses</h2>
          <div className="teacher-courses-list">
            {teacherProfile.courses.map(course => (
              <TeacherCourseCard key={course.id} course={course} />
            ))}
          </div>
          <button className="show-all-courses-btn">Show all courses</button>
        </div>
        <aside className="profile-sidebar">
          <InfoCard profile={teacherProfile} />
        </aside>
      </div>
    </main>
  );
};

export default TeacherProfilePage;