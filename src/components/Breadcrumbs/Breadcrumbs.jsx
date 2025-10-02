import React from 'react';
import './Breadcrumbs.css';

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="breadcrumbs container">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <a href="#" className="breadcrumb-item">{item}</a>
          {index < items.length - 1 && <span className="breadcrumb-separator">/</span>}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;