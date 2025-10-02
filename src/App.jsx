import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Page Imports
import HomePage from './pages/HomePage';
import CourseDetailPage from './pages/CourseDetailPage';
import TeacherProfilePage from './pages/TeacherProfilePage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import MyCoursesPage from './pages/MyCoursesPage';
import PromotionsPage from './pages/PromotionsPage';
import SupportPage from './pages/SupportPage';
import CreateCoursePage from './pages/CreateCoursePage';
import TeacherDashboard from './pages/TeacherDashboard';
import EditCoursePage from './pages/EditCoursePage'; // <-- IMPORT NEW PAGE

// Component Imports
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import './App.css';

const MainLayout = ({ children }) => (
  <>
    <Header />
    <div className="main-content">{children}</div>
    <Footer />
    
  </>
);

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/course/:id" element={<MainLayout><CourseDetailPage /></MainLayout>} />
        <Route path="/teacher-profile" element={<MainLayout><TeacherProfilePage /></MainLayout>} />
        <Route path="/promotions" element={<MainLayout><PromotionsPage /></MainLayout>} />
        <Route path="/support" element={<MainLayout><SupportPage /></MainLayout>} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Protected Routes */}
        <Route path="/checkout" element={<ProtectedRoute><MainLayout><CheckoutPage /></MainLayout></ProtectedRoute>} />
        <Route path="/my-courses" element={<ProtectedRoute><MainLayout><MyCoursesPage /></MainLayout></ProtectedRoute>} />
        <Route path="/create-course" element={<ProtectedRoute><MainLayout><CreateCoursePage /></MainLayout></ProtectedRoute>} />
        <Route path="/course/:id/edit" element={<ProtectedRoute><MainLayout><EditCoursePage /></MainLayout></ProtectedRoute>} /> {/* <-- ADDED NEW ROUTE */}

        {/* Dynamic Dashboard Route */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <MainLayout>
                {user?.role === 'Teacher' ? <TeacherDashboard /> : <DashboardPage />}
              </MainLayout>
            </ProtectedRoute>
          } 
        />

        {/* Fallback Route */}
        <Route path="*" element={<MainLayout><div><h2>404 Not Found</h2></div></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;