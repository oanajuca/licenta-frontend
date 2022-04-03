import React, { useState } from 'react';
import { EyeCloseIcon, EyeOpenIcon } from './icons';
import './style.css';

function FormInput({
  label, type = 'text', className, value, setValue, placeholder, setInputError, name,
}) {
  // set state for input
  const [error, setError] = useState('');
  const [genError, setGenError] = useState(false);
  const [inputType, setInputType] = useState(type === 'password' ? 'password' : 'text');
  const toggleInput = () => (inputType === 'password' ? setInputType('text') : setInputType('password'));
  // validate fields when clicking outside the box
  const handleBlur = (event) => {
    event.preventDefault();

    switch ((type, label)) {
      case 'Username':
        value.length === 0
          ? setError('Este necesară introducerea unui username.')
          : setError('');
        break;
      case 'Password':
        value.length < 3
          ? setError('Este neceesară introducerea unei parole.')
          : setError('');
        break;
      case 'Username*':
      case 'Email address*':
      case 'Temporary password*':
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
    if (value.includes(' ')) {
      setError('Nu se pot adăuga spații!.');
    }
  };

  // handle change
  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <div className="input-with-err">
      <label
        htmlFor={`${label}-input`}
        className={`inputLabel ${error || genError ? 'wrongLabel' : ''}`}
      >
        {label}
      </label>

      <div className={`inputWrapper ${className}`}>
        <input
          className={`inputField ${error || genError ? 'wrongInputField' : ''}`}
          type={inputType}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          id={`${label}-input`}
        />
        {type === 'password' && (<i className="eyecon" onClick={() => toggleInput()}>{inputType === 'password' ? EyeOpenIcon : EyeCloseIcon}</i>)}
      </div>
      {error && <p className="wrongFormInput">{error}</p>}
    </div>
  );
}

export default FormInput;
