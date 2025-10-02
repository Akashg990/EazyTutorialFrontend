import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './StudentManagement.css';

const StudentManagement = ({ courseId }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchStudents();
  }, [courseId]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/courses/${courseId}/students`, {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setStudents(data);
      }
    } catch (error) {
      console.error("Failed to fetch students", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveStudent = async (studentId) => {
    if (window.confirm('Are you sure you want to remove this student from the course?')) {
      try {
        const response = await fetch(`/api/courses/${courseId}/students/${studentId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${user.token}` },
        });
        if (response.ok) {
          fetchStudents(); // Refresh the list
        } else {
          alert('Failed to remove student.');
        }
      } catch (error) {
        console.error('Failed to remove student', error);
      }
    }
  };

  if (loading) return <p>Loading students...</p>;

  return (
    <div className="student-management">
      <h3>Enrolled Students ({students.length})</h3>
      {students.length > 0 ? (
        <ul className="student-list">
          {students.map(student => (
            <li key={student._id} className="student-item">
              <span className="student-name">{student.name} ({student.email})</span>
              <button onClick={() => handleRemoveStudent(student._id)} className="remove-student-btn">
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No students are currently enrolled.</p>
      )}
    </div>
  );
};

export default StudentManagement;