import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import CourseList from '../components/CourseList/CourseList';
import Searchbar from '../components/Searchbar/Searchbar';

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [featuredCourse, setFeaturedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const url = searchQuery 
          ? `/api/courses?search=${searchQuery}` 
          : '/api/courses';
        
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch courses');
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    const fetchFeaturedCourse = async () => {
      try {
        const res = await fetch('/api/courses/featured');
        if (res.ok) {
          const data = await res.json();
          setFeaturedCourse(data);
        } else {
          setFeaturedCourse(null); // Clear if no featured course is found
        }
      } catch (err) {
        console.error(err);
      }
    };

    const loadData = async () => {
      setLoading(true);
      setError(null);
      if (searchQuery) {
        await fetchAllCourses();
      } else {
        await Promise.all([fetchAllCourses(), fetchFeaturedCourse()]);
      }
      setLoading(false);
    };

    loadData();
  }, [searchQuery, location]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  
  return (
    <main>
      <Searchbar onSearch={handleSearch} />
      <Hero featuredCourse={featuredCourse} />
      
      {loading ? (
        <div className="container" style={{ textAlign: 'center', padding: '40px 20px' }}>Loading...</div>
      ) : error ? (
        <div className="container" style={{ textAlign: 'center', padding: '40px 20px' }}>Error: {error}</div>
      ) : (
        <>
          <CourseList 
            title={searchQuery ? `Search Results for "${searchQuery}"` : "Recommended for you"} 
            courses={courses.slice(0, 4)} 
          />
          <CourseList 
            title="Popular courses" 
            courses={courses.slice().reverse().slice(0, 4)}
          />
        </>
      )}
    </main>
  );
};

export default HomePage;