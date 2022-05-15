import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button-component';
import CardComponent from '../components/card-component';
import FormInput from '../components/input-component';


function NewUser() {
  const navigate = useNavigate();
  const [role, setRole] = useState(['User']);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [inputError, setInputError] = useState('');
  const [success, setSuccess] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleDismiss = () => setInputError(!inputError);
  useEffect(() => {
    if (firstname.length > 2 && lastname.length > 2 && username.length > 2 && password.length > 6 && email.length > 2 ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [username, password, email]);
  const handleCreate = () => {
    // Check conditions
    if (isFormValid) {
      fetch(`http://localhost:8088/apuseniilapas/api/user/signup?firstname=${firstname}&lastname=${lastname}&username=${username}&email=${email}&role=${role}&password=${password} `, {
        method: 'POST',
      })
        .then((response) => {
          if (response.ok) {
            console.log(response.status);
            setSuccess('Contul a fost creat cu succes!');
            navigate('/');
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
    <div className="new-user_wrapper">
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
      <CardComponent>
        {error !== '' ? <p className="wrongFormInput">{error}</p> : ''}
        <form className="register-form">
          <FormInput
              type="text"
              label="Prenume*"
              value={firstname}
              setValue={setFirstName}
              setInputError={setInputError}
              placeholder="e.g. Ioana"
            />
             <FormInput
              type="text"
              label="Nume*"
              value={lastname}
              setValue={setLastName}
              setInputError={setInputError}
              placeholder="e.g.Popescu"
            />
            <FormInput
              type="text"
              label="Username*"
              value={username}
              setValue={setUsername}
              setInputError={setInputError}
              placeholder="e.g. ioana.popescu"
            />

            <FormInput
              type="email"
              label="Adresa email*"
              value={email}
              setValue={setEmail}
              setInputError={setInputError}
              placeholder="e.g. ioana.popescu@yahoo.com"
            />
            <input
              type="hidden"
              label="Rol"
              value={role}
              setValue={setRole}
              setInputError={setInputError}
              placeholder="e.g. user"
            />
            <FormInput
              type="password"
              label="Parola*"
              value={password}
              setValue={setPassword}
              setInputError={setInputError}
              placeholder=""
            />
          <Button disabled={!isFormValid} type="submit" className="button__createuser" handleClick={handleCreate}> Creare</Button>
        </form>
      </CardComponent>
    </div>
  );
}

export default NewUser;
