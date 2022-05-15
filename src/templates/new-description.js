import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button-component';
import FormInput3 from '../components/input-component/index3';
import './new-trail.css';


function NewTrailDescription() {
  const navigate = useNavigate();
  const [shortdescription, setShortDescription] = useState('');
  const [steps, setSteps] = useState('');
  const [indications, setIndications] = useState('');
  const [equipment, setEquipment] = useState('');
  const [observations, setObservation] = useState('');
  const [trailid, setTrailId] = useState('');
  const [error, setError] = useState('');
  const [inputError, setInputError] = useState('');
  const [success, setSuccess] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleDismiss = () => setInputError(!inputError);

  useEffect(() => {
    if (shortdescription.length > 50 && steps.length > 2 && indications.length > 2 && equipment.length > 2 && observations.length > 2 && trailid.length >= 1) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [shortdescription, steps, indications, equipment, observations, trailid]);
  const handleCreate = () => {
    if (isFormValid) {
      fetch(`http://localhost:8088/apuseniilapas/api/description/adddescription?steps=${steps}&indications=${indications}&equipment=${equipment}&observations=${observations}&trailid=${trailid}&shortdescription=${shortdescription}`, {
        method: 'POST',
      })
        .then((response) => {
          if (response.ok) {
            console.log(response.status);
            setSuccess('Descrierea a fost creata cu succes!');
            navigate('/addnewguide');
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
        <p>Adaugarea descrierii pentru traseu</p>
      </div>
      <div className="all_cards">
      <div className="card1">
        {error !== '' ? <p className="wrongFormInput">{error}</p> : ''}
        <form className="register-form">
            <div className="form_wrapper">
            <div className="firstcol">
          <FormInput3
              type="text"
              label="Pasii de urmat*"
              value={steps}
              setValue={setSteps}
              setInputError={setInputError}
              placeholder="se vor introduce pasii de urmat avand in vedere parcurgerea traseului"
            />
             <FormInput3
              type="text"
              label="Indicatii*"
              value={indications}
              setValue={setIndications}
              setInputError={setInputError}
              placeholder="se vor introduce indicatii cu privire la traseu"
            />
            <FormInput3
              type="text"
              label="Echipamentul necesar*"
              value={equipment}
              setValue={setEquipment}
              setInputError={setInputError}
              placeholder="se vor introduce informatii cu privire la echipament"
            />
            </div>
            <div className="secondcol">
            <FormInput3
              type="text"
              label="Observatii*"
              value={observations}
              setValue={setObservation}
              setInputError={setInputError}
              placeholder="se vor introduce observatii legate de traseu"
            />
            <FormInput3
              type="text"
              label="Traseul*"
              value={trailid}
              setValue={setTrailId}
              setInputError={setInputError}
              placeholder=" se va introduce id-ul traseului pentru care se adauga descrierea"
            />
            <FormInput3
              type="text"
              label="Scurta descriere a traseului*"
              value={shortdescription}
              setValue={setShortDescription}
              setInputError={setInputError}
              placeholder="se va introduce o descriere scurta a traseului"
            />
            </div>
            </div>
          <Button disabled={!isFormValid} type="submit" className="button__createtrail" handleClick={handleCreate}> Creare</Button>
        </form>
     
      </div>
     
      </div>
    </div>
  );
}

export default NewTrailDescription;
