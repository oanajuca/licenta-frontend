import React from 'react';
import './login-page.css';
import Login from '../templates/Login';
import LogoComponent from '../components/logo-component';

function LoginPage() {
  return (
    <div className="login__wrapper">
      <LogoComponent className="center down logo__pos" />
      <Login />
    </div>
  );
}

export default LoginPage;