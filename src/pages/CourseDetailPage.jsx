import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Component Imports
import CourseHero from '../components/CourseHero/CourseHero';
import CoursePlayerLayout from '../components/CoursePlayerLayout/CoursePlayerLayout';
import StudentManagement from '../components/StudentManagement/StudentManagement';

// This is a helper component for the teacher's management view
const CourseManagementView = ({ course }) => {
  return (
    <>
      <CoursePlayerLayout 
        course={course} 
        enrollment={{ completedSections: [] }} // Teachers don't have progress
        onSectionComplete={() => {}} // No action needed for teachers
        courseAuthorId={course.authorId}
      />
      <div className="container" style={{ padding: '0 20px 40px' }}>
        <StudentManagement courseId={course._id} />
      </div>
    </>
  );
};


const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrolling, setEnrolling] = useState(false);
  
  const isAuthor = user && course && user._id === course.authorId;

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const courseRes = await fetch(`/api/courses/${id}`);
        if (!courseRes.ok) throw new Error('Course not found');
        const courseData = await courseRes.json();
        setCourse(courseData);

        // Only check enrollment if the user is logged in AND is not the author
        if (user && courseData.authorId !== user._id) {
          const enrollRes = await fetch('/api/users/my-courses', {
            headers: { 'Authorization': `Bearer ${user.token}` }
          });
          if (enrollRes.ok) {
            const enrolledCourses = await enrollRes.json();
            const currentEnrollment = enrolledCourses.find(e => e.course?._id === id);
            if (currentEnrollment) {
              setEnrollment(currentEnrollment);
            }
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [id, user]);

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setEnrolling(true);
    try {
      const response = await fetch(`/api/courses/${id}/enroll`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      const data = await response.json(); // Backend returns the updated user object
      if (!response.ok) throw new Error(data.message || 'Enrollment failed');
      
      // Merge new data (like tokenBalance) with old data (like token)
      updateUser({ ...user, ...data });
      setEnrollment({ course: course, completedSections: [] });
    } catch (err) {
      setError(err.message);
    } finally {
      setEnrolling(false);
    }
  };

  const handleSectionComplete = (sectionId) => {
    setEnrollment(prevEnrollment => {
      const completedSet = new Set(prevEnrollment.completedSections);
      completedSet.add(sectionId);
      return {
        ...prevEnrollment,
        completedSections: Array.from(completedSet)
      };
    });
  };

  if (loading) return <div className="container" style={{ padding: '40px 20px' }}>Loading...</div>;
  if (error) return <div className="container" style={{ padding: '40px 20px' }}>Error: {error}</div>;
  if (!course) return <div className="container" style={{ padding: '40px 20px' }}>Course not found.</div>;

  // --- Main Render Logic ---
  const renderContent = () => {
    if (isAuthor) {
      return <CourseManagementView course={course} />;
    }
    if (enrollment) {
      return <CoursePlayerLayout course={course} enrollment={enrollment} onSectionComplete={handleSectionComplete} courseAuthorId={course.authorId} />;
    }
    return <CourseHero course={course} onEnroll={handleEnroll} enrolling={enrolling} />;
  };

  return <main>{renderContent()}</main>;
};

export default CourseDetailPage;