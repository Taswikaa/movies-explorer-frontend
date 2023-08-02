import { React, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css'
import logo from '../../images/logo.svg'

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [navigationVisible, setNavigationVisible] = useState(false);

  const openNavMenu = function() {
    setNavigationVisible(true);
  }

  const closeNavMenu = function() {
    setNavigationVisible(false);
  }

  return (
    <>
      <header className='header'>
        <div className="header__container">
          <img src={logo} alt='' onClick={() => navigate('/')}></img>
          {location.pathname === '/' ? (
            <nav className='header__menu'>
              <button className='header__button header__button_bg_transparent' onClick={() => navigate('/signup')}>Регистрация</button>
              <button className='header__button' onClick={() => navigate('/signin')}>Войти</button>
            </nav>
          ) :
          (
            <>
              <button
                className='header__button_burger' 
                onClick={openNavMenu}
              ></button>
              <div className='header__links'>
                <Link className='header__link header__link_fw_bold' to='/movies'>Фильмы</Link>
                <Link className='header__link' to='/saved-movies'>Сохранённые фильмы</Link>
              </div>
              <Link className='header__button_account' to='/profile'>Аккаунт</Link>
            </>
          )}
        </div>
      </header>
      <Navigation closeNavMenu={closeNavMenu} navigationVisible={navigationVisible} />
    </>
  );
}

export default Header;