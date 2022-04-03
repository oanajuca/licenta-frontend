import React from 'react';
import './style.css';
import Logo from './logo.js';

export default function LogoComponent(props) {
  const { className } = props;
  return (
    <div className={`${className}`}>
      <Logo />
      <div className="title">APUSENII LA PAS</div>
    </div>
  );
}
