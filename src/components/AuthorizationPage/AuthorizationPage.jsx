import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthorizationPage.css';
import logo from '../../images/logo.svg';

const AuthorizationPage = ({ heading, children }) => {
  const navigate = useNavigate();

  return (
    <div className='authorization-page'>
      <header className='authorization-page__header'>
        <img src={logo} alt='' onClick={() => navigate('/')}/>
        <h3 className='authorization-page__heading'>{heading}</h3>
      </header>
      {children}
    </div>
  );
}

export default AuthorizationPage;
