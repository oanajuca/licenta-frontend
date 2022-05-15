import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button-component';
import CardComponent from '../components/card-component';
import './new-trail.css';
import FormInput2 from '../components/input-component/index2';

function NewTrailGuide() {
  const navigate = useNavigate();
  const [traiild, setTrailId] = useState('');
  const [guideid, setGuideId] = useState('');
  const [error, setError] = useState('');
  const [inputError, setInputError] = useState('');
  const [success, setSuccess] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleDismiss = () => setInputError(!inputError);

  useEffect(() => {
    if ( traiild.length >= 1 && guideid.length >= 1) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [traiild, guideid]);
  const handleCreate = () => {
    if (isFormValid) {
      fetch(`http://localhost:8088/apuseniilapas/api/touristguide/addnewguide?trailid=${traiild}&guideid=${guideid}`, {
        method: 'POST',
      })
        .then((response) => {
          if (response.ok) {
            console.log(response.status);
            setSuccess('Ghidul Turistului a fost creat cu succes!');
            navigate('/home');
            window.location.reload();
            return response;
          }
          throw new Error(response.status);
        }).then(() => {
          setTimeout(() => { <p></p>; });
        }).catch(() => {
          setError('Ceva nu a mers.');
        });
    } else {
      setError('Unul sau mai multe câmpuri nu îndeplinesc cerințele. Încercați din nou.');
    }
    
  };

  return (
    <div className="new-trail_wrapper">
      {success && (
        <div className="genSuccess">
          <p className="genSuccessText">{success}</p>
        </div>
      )}
      {inputError && (
      <div>
        <div className="genError">
          <p className="genErrorText">{inputError}</p>
          <button className="dismissError" type="button" onClick={handleDismiss}>x</button>
        </div>
      </div>
      )}
      <div className="addpagetitle">
        <p>Adaugarea ghidului turistului pentru traseu</p>
      </div>
      <div className="all_cards">
      <div className="card1">
      <CardComponent>
        {error !== '' ? <p className="wrongFormInput">{error}</p> : ''}
        <form className="register-form">
            <div className="form_wrapper">
          <FormInput2
              type="text"
              label="Traseul*"
              value={traiild}
              setValue={setTrailId}
              setInputError={setInputError}
              placeholder="se va introduce id-ul traseului"
            />
             <FormInput2
              type="text"
              label="Ghidul turistului aferent*"
              value={guideid}
              setValue={setGuideId}
              setInputError={setInputError}
              placeholder="se va introduce id-ul traseului"
            />
            
            </div>
          <Button disabled={!isFormValid} type="submit" className="button__createtrail" handleClick={handleCreate}> Creare</Button>
        </form>
      </CardComponent>
      </div>
     
      </div>
    </div>
  );
}

export default NewTrailGuide;
