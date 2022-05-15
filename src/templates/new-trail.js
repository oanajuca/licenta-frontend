import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '../components/button-component';
import CardComponent from '../components/card-component';
import FormInput from '../components/input-component';
import './new-trail.css';
import FormInput2 from '../components/input-component/index2';

function NewTrail() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [mark, setMark] = useState('');
  const [map, setMap] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [error, setError] = useState('');
  const [inputError, setInputError] = useState('');
  const [success, setSuccess] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleDismiss = () => setInputError(!inputError);

  useEffect(() => {
    if (name.length > 2 && location.length > 2 && distance.length > 2 && time.length > 2 && mark.length > 2 && map.length > 2 && difficulty.length >= 2) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [name, location, distance, time, mark, map, difficulty]);
  const handleCreate = () => {
    if (isFormValid) {
      fetch(`http://localhost:8088/apuseniilapas/api/trail/addnew?name=${name}&location=${location}&distance=${distance}&time=${time}&mark=${mark}&map=${map}&difficulty=${difficulty}`, {
        method: 'POST',
      })
        .then((response) => {
          if (response.ok) {
            console.log(response.status);
            setSuccess('Traseul a fost creat cu succes!');
            navigate('/addnewdescription');
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
        <p>Adaugarea unui traseu</p>
      </div>
      <div className="all_cards">
      <div className="card1">
      <CardComponent>
        {error !== '' ? <p className="wrongFormInput">{error}</p> : ''}
        <form className="register-form">
            <div className="form_wrapper">
            <div className="firstcol">
          <FormInput2
              type="text"
              label="Denumirea Traseului*"
              value={name}
              setValue={setName}
              setInputError={setInputError}
              placeholder="e.g. Circuitul Cetatile Ponorului"
            />
             <FormInput2
              type="text"
              label="Locatia Traseului*"
              value={location}
              setValue={setLocation}
              setInputError={setInputError}
              placeholder="e.g.Bihor"
            />
            <FormInput2
              type="text"
              label="Distanta Traseului*"
              value={distance}
              setValue={setDistance}
              setInputError={setInputError}
              placeholder="e.g. 15Km"
            />

            <FormInput2
              type="text"
              label="Timpul de parcurgere*"
              value={time}
              setValue={setTime}
              setInputError={setInputError}
              placeholder="e.g. 2:30-3:00h"
            />
            </div>
            <div className="secondcol">
            <FormInput2
              type="text"
              label="Marcajul Traseului"
              value={mark}
              setValue={setMark}
              setInputError={setInputError}
              placeholder=" se va introduce linkul imaginii aferente marcajului pentru traseu"
            />
            <FormInput2
              type="text"
              label="Harta Traseului*"
              value={map}
              setValue={setMap}
              setInputError={setInputError}
              placeholder="se va introduce linkul aferent hartii traseului"
            />
             <FormInput2
              type="text"
              label=" Dificultatea Traseului*"
              value={difficulty}
              setValue={setDifficulty}
              setInputError={setInputError}
              placeholder="e.g. Usor"
            />
             
            </div>
            </div>
          <Button disabled={!isFormValid} type="submit" className="button__createtrail" handleClick={handleCreate}> Creare</Button>
        </form>
      </CardComponent>
      </div>
     
      </div>
    </div>
  );
}

export default NewTrail;
