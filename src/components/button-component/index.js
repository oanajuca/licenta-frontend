import React from 'react';
import './style.css';

function Button({
  className, disabled, handleClick, children, onSubmit,
}) {
  return (
    <button
      type="button"
      className={`button__component ${className} ${disabled ? 'disabled' : ''}`}
      disabled={disabled}
      onClick={handleClick}
      onSubmit={onSubmit}
    >
      {children}
    </button>
  );
}

export default Button;