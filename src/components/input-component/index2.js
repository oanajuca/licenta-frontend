import React, { useState } from 'react';
import './style.css';

function FormInput2({
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
        case 'Denumirea Traseului*':
        case 'Locatia Traseului*':
        case 'Distanta Traseului*':
          case 'Timpul de parcurgere*':
        case 'Marcajul Traseului*':
        case 'Harta Traseului*':
            case 'Dificultatea Traseului*':
              case 'Traseul*':
                case 'Ghidul turistului aferent*':
                case 'Ghidul Turistic pentru Traseu*':
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
      </div>
      {error && <p className="wrongFormInput">{error}</p>}
    </div>
  );
}

export default FormInput2;