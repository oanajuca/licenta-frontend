import React, { useContext, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDetectOutsideClick } from '../../helpers/useDetectOutsideClick';
import UserContext from '../../helpers/UseContext/UserContext';
import ChangePassword from '../../pages/change-password-page';
import Button from '../button-component';
import LinkComponent from '../link-component';
import ReactTooltip from 'react-tooltip';
import {
  UserIcon, UserIconGray, PlusIcon, LogOutIcon,WriteIcon
} from './icons';


function UserButton() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const { userState } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] =useState(false);
   useEffect(() => {
          if(userState.Id === ''){
            setIsAuthenticated(false);
        }
        else{
            setIsAuthenticated(true)
        }
         
        },[])
        const handleUserDrop = () => {
          setIsActive(!isActive) 
        }

  const handleSignOut = () => {
    localStorage.removeItem('userSession');
    navigate('/');
    window.location.reload()
  };
  


  return (
    <div ref={dropdownRef} className="btn-container">
      <Button className="sign_out_button" handleClick={handleUserDrop}>
        <i>{UserIcon}</i>
      </Button>
      
      {(isAuthenticated) ? isActive &&  (
      <div className="user-dropdown">
        <a className="dropdown-element">
          <i className="user-icon">{UserIconGray}</i>
           {userState.Username} 
        </a>
        <a className="dropdown-element" href="/change-password">
          <i className="user-icon">{ChangePassword}</i>
         Schimbare parola
        </a>
        <a className="dropdown-element" onClick={handleSignOut}>
          <i className="user-icon">
            {LogOutIcon}
          </i>
          Log out
        </a>
      </div>
      ): ""}
 {!isAuthenticated ? isActive &&
            <div className="user-dropdown">
            <a className="dropdown-element">
            <LinkComponent className="word_rule link"
            path="/"
            label="Această secțiune necesită autentificare" />
            </a>
            </div>
          : "" } 

    </div>
  );
}

export default UserButton;