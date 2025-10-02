import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // <-- IMPORT useLocation
import { useAuth } from '../context/AuthContext';
import InProgressCourseCard from '../components/InProgressCourseCard/InProgressCourseCard';
import './MyCoursesPage.css';

const MyCoursesPage = () => {
  const { user } = useAuth();
  const location = useLocation(); // <-- INITIALIZE the hook
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user?.token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch('/api/users/my-courses', {
          headers: { 'Authorization': `Bearer ${user.token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setEnrolledCourses(data);
        }
      } catch (error) {
        console.error("Failed to fetch enrolled courses", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [user, location]); // <-- ADD location to the dependency array

  if (loading) {
    return <div className="container" style={{ padding: '40px 20px' }}>Loading your courses...</div>;
  }

  return (
    <main className="my-courses-page">
      <div className="container">
        <h1>My Courses</h1>
        {enrolledCourses.length > 0 ? (
          <div className="courses-list">
            {enrolledCourses.map(enrollment => {
              if (!enrollment.course) return null;
              
              // Use enrollment.course.sections here
              const totalSections = enrollment.course.sections ? enrollment.course.sections.length : 0;
              const progress = totalSections > 0 
                ? (enrollment.completedSections.length / totalSections) * 100 
                : 0;
              
              return (
                <InProgressCourseCard 
                  key={enrollment.course._id} 
                  course={enrollment.course} 
                  progress={progress}
                />
              );
            })}
          </div>
        ) : (
          <div className="no-courses-message">
            <p>You are not enrolled in any courses yet.</p>
            <p>Explore our courses and start your learning journey!</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyCoursesPage;