// Central config for API base URL
export const API = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL)
  ? import.meta.env.VITE_API_URL
  : (window.process && window.process.env && window.process.env.REACT_APP_API_URL)
    ? window.process.env.REACT_APP_API_URL
    : 'https://eazy-tutorial-backend.vercel.app';
export default API;
