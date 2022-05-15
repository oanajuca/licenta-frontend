import React, { useState } from 'react';
import './style.css';

function FormInput3({
  label, type = 'text', className, value, setValue, placeholder, setInputError, name,
}) {
  // set state for input
  const [error, setError] = useState('');
  const [genError, setGenError] = useState(false);
  const [inputType, setInputType] = useState();


  // validate fields when clicking outside the box
  const handleBlur = (event) => {
    event.preventDefault();

    switch ((type, label)) {
        case 'Scurta descriere a traseului*':
        case 'Pasii de urmat*':
        case 'Indicatii*':
          case 'Observatii*':
        case 'Echipamentul necesar*':
        case 'Traseul*':
        if (value.length === 0) {
          setGenError(true);
          setInputError('Completați toate câmpurile');
        } else {
          setInputError('');
          setGenError(false);
        }
        break;
      default:
        break;
    }
    
  };

  // handle change
  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <div className="input-with-err2">
      <label
        htmlFor={`${label}-input`}
        className={`inputLabel ${error || genError ? 'wrongLabel' : ''}`}
      >
        {label}
      </label>

      <div className={`inputWrapper ${className}`}>
        <input
          className={`inputField2 ${error || genError ? 'wrongInputField2' : ''}`}
          type={inputType}
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

export default FormInput3;