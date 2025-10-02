import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import StatsCard from '../components/StatsCard/StatsCard';
import CourseList from '../components/CourseList/CourseList';

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    coursesInProgress: 0,
    coursesCompleted: 0,
    certificatesEarned: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.token) return;
      try {
        setLoading(true);
        const response = await fetch('/api/users/stats', {
          headers: { 'Authorization': `Bearer ${user.token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (loading) return <div className="container" style={{ padding: '40px 20px' }}>Loading dashboard...</div>;

  return (
    <main className="container" style={{ padding: '40px 20px', minHeight: '70vh' }}>
      <h1 className="dashboard-welcome">Welcome back, {user?.name || 'Student'}!</h1>
      <div style={{ maxWidth: '400px', margin: '30px 0' }}>
        <StatsCard stats={stats} />
      </div>
      {/* In a future step, you could fetch real course recommendations here */}
      <CourseList title="Recommended For You" courses={[]} />
    </main>
  );
};

export default DashboardPage;