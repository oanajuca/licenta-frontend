import React, { useState, useRef, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
 import UserContext from '../helpers/UseContext/UserContext'; 
import CardComponent from '../components/card-component';
import { EyeCloseIcon, EyeOpenIcon } from '../components/input-component/icons';
import Spinner from '../components/spinner-component';


export default function ChangePass() {
  const { userState } = useContext(UserContext); 
  const [password, setPassword] = useState();
  const { register, handleSubmit } = useForm();
  const [passErr, setPassErr] = useState(false);
  const [currentPassErr, setCurrentPassErr] = useState(false);
  const [error, setError] = useState(false);
  const [similarError, setSimilarError] = useState(false);
  const [NewPassword, setNewPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputType, setInputType] = useState('password');
  const [inputType2, setInputType2] = useState('password');
  const [inputType3, setInputType3] = useState('password');
  const inputPassword = useRef();
  const navigate = useNavigate('');
  const toggleInput = () => (inputType === 'password' ? setInputType('text') : setInputType('password'));
  const toggleInput2 = () => (inputType2 === 'password' ? setInputType2('text') : setInputType2('password'));
  const toggleInput3 = () => (inputType3 === 'password' ? setInputType3('text') : setInputType3('password'));

   const username = userState.Username; 
  const submitForm = () => {
    setIsLoading(true);
    fetch(`http://localhost:8088/apuseniilapas/api/user/changePassword?username=${username}&oldPassword=${password}&newPassword=${NewPassword}`, {
      method: 'POST',
    }).then((response) => {
      setIsLoading(false);
      if (response.ok) {
        return response.json();
      }
      return setPassErr(response.status);
    }).then((data) => {
      if (data.Category && data.Category === 'WARN') {
        setCurrentPassErr(data.Description);
      }
    })
      .catch(() => {
        <div className="error_message" style={{ textAlign: 'center' }}>O eroare a intervenit în timpul schimbării parolei. Vă rugăm încercați din nou.</div>;
      });
    setTimeout(() => {
      navigate('/successfully');
    });
  };
  const getCurrentPassword = () => {
    fetch(
      `http://localhost:8800/glossary/api/user/login?username=${username}&password=${password}`,
      {
        method: 'POST',
      },
    )
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          setCurrentPassErr(false);
          return response.json();
        }
        return setCurrentPassErr('Parola este incorectă. Vă rugăm încercați din nou.');
      })
      .catch(() => {
        setCurrentPassErr('Parola este incorectă. Vă rugăm încercați din nou.');
      });
  };

  const validateNewPassword = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d].{5,}/g;
    const result = regex.test(NewPassword);
    result ? setPassErr(false) : setPassErr('Vă rugăm folosiți atât litere mari și mici cât și numere');
    password === NewPassword ? setSimilarError('Noua parolă nu poate fi similară cu cea veche!') : setSimilarError('');
  };
  const confirmNewPassword = () => {
    NewPassword !== ConfirmPassword ? setError('Noua parolă nu se potrivește cu confirmarea noii parole!') : setError('');
  };

  return (
    <div>
      {isLoading ? (<Spinner />) : (
        <div className="wrapper_log">
          <div className="centered__card">
            {passErr || currentPassErr ? (<p className={` ${passErr || currentPassErr ? 'error_message' : ''}`}>{passErr || currentPassErr}</p>) : ' '}
            <CardComponent>
              <form
                className="change_password_form"
                onSubmit={handleSubmit(submitForm)}
              >
                <label className="inputLabel">Parola Curentă</label>
                <div className="inputWrapper">
                  <input
                    {...register('Password')}
                    className="inputField"
                    id="Password"
                    name="Password"
                    type={inputType}
                    onBlur={(e) => getCurrentPassword(e.target.value)}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <i className="eyecon" onClick={() => toggleInput()}>
                    {inputType === 'password' ? EyeOpenIcon : EyeCloseIcon}
                    {' '}
                  </i>
                </div>
                <div className={` ${passErr ? 'wrongFormInput' : 'inputWrapper'}`}>
                  <label className="inputLabel">Noua Parolă</label>
                  <label className="labels"></label>
                </div>
                <div className="inputWrapper">
                  <input
                    {...register('NewPassword')}
                    ref={inputPassword}
                    className={` inputField ${passErr ? 'wrong ' : ''}`}
                    id="NewPassword"
                    name="NewPassword"
                    type={inputType2}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onBlur={validateNewPassword}
                    required
                  />
                  <i className="eyecon" onClick={() => toggleInput2()}>
                    {inputType2 === 'password' ? EyeOpenIcon : EyeCloseIcon}
                    {' '}
                  </i>
                </div>
                <label className="inputLabel">Confirmă Noua Parolă</label>
                <div className="inputWrapper">
                  <input
                    {...register('ConfirmPassword')}
                    id="ConfirmPassword"
                    className="inputField"
                    name="ConfirmPassword"
                    type={inputType3}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={confirmNewPassword}
                    required
                  />
                  <i className="eyecon" onClick={() => toggleInput3()}>
                    {' '}
                    {inputType3 === 'password' ? EyeOpenIcon : EyeCloseIcon}
                    {' '}
                  </i>
                </div>
                {error ? <p className="wrongFormInput">{error}</p> : ''}
                {similarError ? <p className="wrongFormInput">{similarError}</p> : ''}
                <button
                  className="button__signIn button__component"
                  type="submit"
                  disabled={!!error || passErr}
                  onSubmit={handleSubmit}
                >
                  Schimbă Parola
                </button>
              </form>
            </CardComponent>
          </div>
        </div>
      )}
      ;
    </div>
  );
}
