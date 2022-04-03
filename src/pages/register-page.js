import React from 'react';
import LogoComponent from '../components/logo-component';
import './register.css';
import NewUser from '../templates/new-user';

function NewUserPage() {
  return (
         <div className="register_wrapper">
            <LogoComponent className="center down logo_pos" />
      <NewUser />
    </div>
  );
}

export default NewUserPage;