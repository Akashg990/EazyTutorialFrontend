import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../components/CourseCard/CourseCard.css'; // Re-using styles for consistency

const TeacherDashboard = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchMyCourses = async () => {
    if (!user?.token) return;
    try {
      setLoading(true);
      const response = await fetch('/api/courses/mycourses', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setMyCourses(data);
      }
    } catch (error) {
      console.error("Failed to fetch teacher's courses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, [user]);

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/courses/${courseId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${user.token}` },
        });

        if (response.ok) {
          fetchMyCourses(); // Refresh the course list after deleting
        } else {
          alert('Failed to delete course.');
        }
      } catch (error) {
        console.error('Failed to delete course', error);
      }
    }
  };

  const handleFeature = async (courseId) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/feature`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${user.token}` },
      });

      if (response.ok) {
        alert('Course is now featured on the homepage!');
        fetchMyCourses(); // Refresh to show the "Featured" tag
      } else {
        alert('Failed to feature course.');
      }
    } catch (error) {
      console.error('Failed to feature course', error);
    }
  };

  if (loading) return <div className="container" style={{ padding: '40px 20px' }}>Loading your dashboard...</div>;

  return (
    <main className="container" style={{ padding: '40px 20px', minHeight: '70vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1>Teacher Dashboard</h1>
        <Link to="/create-course" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          + Create New Course
        </Link>
      </div>
      
      <h2>My Created Courses</h2>
      
      {myCourses.length > 0 ? (
        <div className="course-grid" style={{ marginTop: '20px' }}>
          {myCourses.map(course => (
            <div key={course._id} className="course-card" style={{ cursor: 'default', border: course.isFeatured ? '2px solid var(--primary-color)' : '1px solid #ddd' }}>
              {course.isFeatured && <div style={{ background: 'var(--primary-color)', color: 'white', textAlign: 'center', padding: '4px', fontWeight: 'bold' }}>Featured</div>}
              <img src={course.image} alt={course.title} className="card-image" />
              <div className="card-content">
                <p className="card-category">{course.category}</p>
                <h3 className="card-title">{course.title}</h3>
                <div className="teacher-card-actions" style={{ marginTop: 'auto', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button onClick={() => handleFeature(course._id)} className="btn btn-secondary" style={{ background: '#e9ecef', color: '#495057' }}>Feature</button>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Link to={`/course/${course._id}/edit`} className="btn btn-secondary" style={{ flex: 1, textDecoration: 'none', textAlign: 'center' }}>Edit</Link>
                    <button onClick={() => handleDelete(course._id)} className="btn btn-danger" style={{ flex: 1, background: '#dc3545', color: 'white', border: 'none' }}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ marginTop: '20px', color: '#888' }}>You have not created any courses yet. Click the button above to get started!</p>
      )}
    </main>
  );
};

export default TeacherDashboard;