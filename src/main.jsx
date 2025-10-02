// Compatibility shim for Vite env variables and existing code that uses process.env.REACT_APP_API_URL
const VITE_API = import.meta.env.VITE_API_URL || 'https://eazy-tutorial-backend.vercel.app';
window.process = window.process || { env: {} };
window.process.env.REACT_APP_API_URL = VITE_API;

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'; // Import the provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)