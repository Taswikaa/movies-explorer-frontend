import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ closeNavMenu, navigationVisible }) => {
  const location = useLocation();

  const path = location.pathname;

  return (
    <div className={`navigation ${navigationVisible && 'navigation_open'}`}>
      <div className='navigation__container'>
        <button className='navigation__close-button' onClick={closeNavMenu} />
        <ul className='navigation__links'>
          <li>
            <Link className='navigation__link' to='/'>Главная</Link>
          </li>
          <li>
            <Link className={`navigation__link ${path === '/movies' && 'navigation__link_active'}`} to='/movies'>Фильмы</Link>
          </li>
          <li>
            <Link className={`navigation__link ${path === '/saved-movies' && 'navigation__link_active'}`} to='/saved-movies'>Сохранённые фильмы</Link>
          </li>
        </ul>
        <Link className='navigation__account-link' to='/profile'>Аккаунт</Link>
      </div>
    </div>
  );
}

export default Navigation;
