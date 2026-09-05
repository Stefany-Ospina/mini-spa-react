import React from 'react';
import './Navbar.css';

const Navbar = ({ currentPage, onNavigate, logo, navItems }) => {
  return (
    <nav className="navbar">
      <h1 className="navbar__logo">{logo}</h1>
      <div className="navbar__buttons">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`navbar__btn ${currentPage === item.id ? 'navbar__btn--active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
