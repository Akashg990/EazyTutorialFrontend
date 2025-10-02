// src/components/Footer/Footer.jsx
import React from 'react';
import './Footer.css';
import logo from '../../assets/logo.png'; // <-- IMPORT YOUR LOGO

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="footer-main">
          <div className="footer-logo-section">
            <div className="footer-logo">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="var(--primary-color)"/>
                <path d="M10 10H14V22H10V10Z" fill="white"/>
                <path d="M18 10H22V22H18V10Z" fill="white"/>
              </svg>
              <span className="logo-text">Logo</span>
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <a href="#">Blog</a>
              <a href="#">User guides</a>
              <a href="#">Webinars</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Join us</a>
            </div>
          </div>
          <div className="footer-subscribe">
            <h4>Subscribe to our newsletter</h4>
            <p>For product announcements and exclusive insights.</p>
            <form className="subscribe-form">
              <input type="email" placeholder="Input your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="language-selector">
            <span>English ▼</span>
          </div>
          <div className="copyright">
            © 2022 Brand, Inc. · Privacy · Terms · Sitemap
          </div>
          <div className="social-links">
            {/* Add SVG icons for social media here */}
            <a href="https://www.linkedin.com/in/i-altaf-shaikh/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Portfolio</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;