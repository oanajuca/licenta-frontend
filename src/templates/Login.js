import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../components/card-component';
import Button from '../components/button-component';
import FormInput from '../components/input-component';
import LinkComponent from '../components/link-component';
import Spinner from '../components/spinner-component';
import UserContext from '../helpers/UseContext/UserContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate('');
 // const { dispatch } = useContext(UserContext);
  useEffect(() => {
    const activeSession = localStorage.getItem('userSession');
    if (activeSession) navigate('/home');
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    fetch(
      `http://localhost:8088/apuseniilapas/api/user/login?username=${username}&password=${password}`,
      {
        method: 'POST',
      },
    )
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.status);
      })
      .then((data) => {
        localStorage.setItem('userSession', JSON.stringify(data));
       // dispatch({ payload: data, type: 'LOGIN' });
        // needs a  token sent from backend
        setTimeout(() => {
          navigate('/home');
        });
      })
      .catch(() => {
        setError('Username-ul sau parola au fost introduse incorect.');
      });
  };

  return (
    <div>
      {isLoading ? (<Spinner />) : (
        <div className="wrapper_log">
          <div className="centered__card">
            <CardComponent>
              {error !== '' ? <p className="wrongFormInput">{error}</p> : ''}

              <form className="login-form">
                <FormInput
                  type="text"
                  label="Username"
                  value={username}
                  setValue={setUsername}
                />

                <FormInput
                  type="password"
                  label="Password"
                  value={password}
                  setValue={setPassword}
                />

                <Button className="button__signIn" type="submit" handleClick={handleSubmit}>
                  Sign In
                </Button>
              </form>
              <div className="centered__link">
                <LinkComponent
                  path="/register"
                  label="Nu ai cont?Înregistrează-te"
                />
              </div>
              <div className="centered__link">
                <LinkComponent
                  path="/home"
                  label="Continua ca Vizitator"
                />
              </div>
            </CardComponent>
          </div>
        </div>
      )}

    </div>
  );
}

export default Login;