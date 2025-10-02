import React, { useState } from 'react';
import './Searchbar.css';

const Searchbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="searchbar-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Enter Subject eg: Maths, English"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
};

export default Searchbar;