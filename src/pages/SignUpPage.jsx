import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Student'); // Default role
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    setError('');
    signup(name, email, password, role);
    navigate('/');
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Create an Account</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* --- THIS SECTION IS NOW A DROPDOWN --- */}
          <div className="form-group">
            <label htmlFor="role-select">I am a:</label>
            <select id="role-select" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;