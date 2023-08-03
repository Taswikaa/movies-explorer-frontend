import React from 'react';
import { Link } from 'react-router-dom';
import './AuthorizationForm.css';

const AuthorizationForm = ({ isLoginPage, buttonText, questionText, linkText }) => {
  return (
    <form className='authorization-form'>
      <div className="authorization-form__container">
        <div className='authorization-form__inner-container'>
          {!isLoginPage && (
            <div className='authorization-form__input-field'>
              <p className='authorization-form__input-title'>Имя</p>
              <input
                className='authorization-form__input'
                type='text'
                placeholder='Введите имя'
                value='Виталий'
                required
              />
              <p className='authorization-form__input-error'></p>
            </div>
          )}
          <div className='authorization-form__input-field'>
            <p className='authorization-form__input-title'>E-mail</p>
            <input
              className='authorization-form__input'
              type='text'
              placeholder='Введите адрес'
              value='pochta@yandex.ru'
              required
            />
            <p className='authorization-form__input-error'></p>
          </div>
          <div className='authorization-form__input-field'>
            <p className='authorization-form__input-title'>Пароль</p>
            <input
              className='authorization-form__input authorization-form__input_color_red'
              type='password'
              placeholder='Введите пароль'
              value='Виталий'
              required
            />
            <p className='authorization-form__input-error'>Что-то пошло не так...</p>
          </div>
        </div>
        <div className='authorization-form__interaction'>
          <button className='authorization-form__submit-button' type='submit'>{buttonText}</button>
          <div className='authorization-form__interaction-transition'>
            <p className='authorization-form__interaction-text'>{questionText}</p>
            <Link className='authorization-form__interaction-link' to={isLoginPage ? '/signup' : '/signin'}>{linkText}</Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AuthorizationForm;
