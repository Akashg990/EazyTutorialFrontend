import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import InProgressCourseCard from '../components/InProgressCourseCard/InProgressCourseCard';
import './MyCoursesPage.css';

const MyCoursesPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API = process.env.REACT_APP_API_URL; // Ensure your .env variable is set correctly

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user?.token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const response = await fetch(`${API}/api/users/my-courses`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch enrolled courses');
        }

        setEnrolledCourses(data);
      } catch (err) {
        console.error('Failed to fetch enrolled courses', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [user, location, API]);

  if (loading) {
    return <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>Loading your courses...</div>;
  }

  if (error) {
    return <div className="container" style={{ padding: '40px 20px', textAlign: 'center', color: 'red' }}>Error: {error}</div>;
  }

  return (
    <main className="my-courses-page">
      <div className="container">
        <h1>My Courses</h1>
        {enrolledCourses.length > 0 ? (
          <div className="courses-list">
            {enrolledCourses.map(enrollment => {
              if (!enrollment.course) return null;

              const totalSections = enrollment.course.sections?.length || 0;
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
