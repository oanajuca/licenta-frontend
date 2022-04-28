import React, { useState } from 'react';
import './style.css';

function ReviewFormInput({
  label, type = 'text', className, value, setValue, placeholder, name,
}) {
  const [error, setError] = useState('');
  const handleBlur = (event) => {
    event.preventDefault();

    switch ((type, label)) {
      case 'Comment':
        value.length === 0
          ? setError('Este necesară introducerea unui comentariu.')
          : setError('');
        break;
      default:
        break;
    }

  };

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <div className="input-with-err">
      <label
        htmlFor={`${label}-input`}
        className={`inputLabel ${error  ? 'wrongLabel' : ''}`}
      >
        {label}
      </label>

      <div className={`inputWrapper ${className}`}>
        <textarea
          className={`inputField ${error  ? 'wrongInputField' : ''}`}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          id={`${label}-input`}
        />
      </div>
      {error && <p className="wrongFormInput">{error}</p>}
    </div>
  );
}

export default ReviewFormInput;
