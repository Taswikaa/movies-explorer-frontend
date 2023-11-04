import React from 'react';
import './Profile.css';
import Header from '../Header/Header';

const Profile = () => {
  return (
    <div className='profile'>
      <div className='profile__inner-container'>
        <Header></Header>
        <div className='profile__content'>
          <h3 className='profile__heading'>Привет, Виталий!</h3>
          <ul className='profile__info'>
            <li className='profile__item'>
              <p className='profile__name'>Имя</p>
              <p className='profile__value'>Виталий</p>
            </li>
            <li className='profile__item profile__item_border_none'>
              <p className='profile__name'>E-mail</p>
              <p className='profile__value'>pochta@yandex.ru</p>
            </li>
          </ul>
        </div>
        <div className='profile__interaction'>
          <button className='profile__button'>Редактировать</button>
          <button className='profile__button profile__button_color_red'>Выйти из аккаунта</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
