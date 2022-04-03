import React from 'react';
import './style.css';

function Spinner() {
  return (
    <div className="spinner_wrapper">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="loader_spin">
        <circle cx="50" cy="50" r="45" className="circle_spin" />
        <defs>
          <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default Spinner;