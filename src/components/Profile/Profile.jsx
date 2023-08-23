import { React, useContext, useState, useEffect } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Profile = ({ signOut, updateUserInfo }) => {
  const userInfo = useContext(CurrentUserContext);

  const [userInfoChange, setUserInfoChange] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    setUserInfoChange({
      ...userInfoChange,
      name: userInfo.name,
      email: userInfo.email
    })
  }, [userInfo])
  
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const validateEmail = function(e) {
    const regExp = /^\w+@[a-z_]+?\.[a-z]{2,3}$/i;
    if (!regExp.test(e.target.value)) {
      setEmailError('Неверный адрес почты')
    } else {
      setEmailError('');
    }
  }

  const validateName = function(e) {
    const regExp = /^[а-яa-zё\-\s]*$/i;
    if (!regExp.test(e.target.value) || e.target.value.length < 2) {
      setNameError('Недопустимое имя');
    } else {
      setNameError('');
    }
  }

  const handleChange = function(e) {
    const {name, value} = e.target;

    setUserInfoChange({
      ...userInfoChange,
      [name]: value
    });
  }

  const handleEdit = function() {
    let { name, email } = userInfoChange;

    if (!name) name = userInfo.name;
    if (!email) email = userInfo.email;

    updateUserInfo(name, email);
  }

  useEffect(() => {
    if (emailError || nameError || (!userInfoChange.name && !userInfoChange.email)) {
      setIsFormValid(false);
    } else {
      if (userInfoChange.name === userInfo.name && userInfoChange.email === userInfo.email) {
        setIsFormValid(false);
      } else {
        setIsFormValid(true);
      }
    }
  }, [nameError, emailError, userInfoChange]);

  return (
    <div className='profile'>
      <div className='profile__inner-container'>
        <Header></Header>
        <div className='profile__content'>
          <h3 className='profile__heading'>Привет, {userInfo.name}!</h3>
          <ul className='profile__info'>
            <li className='profile__item'>
              <p className='profile__name'>Имя</p>
              <input
                className='profile__value'
                name='name'
                type='text'
                maxLength={30}
                placeholder={userInfo.name}
                value={userInfoChange.name}
                onChange={e => {
                  handleChange(e);
                  validateName(e);
                }}
              />
              <p className='profile__value-error'>{nameError}</p>
            </li>
            <li className='profile__item profile__item_border_none'>
              <p className='profile__name'>E-mail</p>
              <input
                className='profile__value'
                name='email'
                type='text'
                placeholder={userInfo.email}
                value={userInfoChange.email}
                onChange={e => {
                  handleChange(e);
                  validateEmail(e);
                }}
              />
              <p className='profile__value-error profile__value-error_pos_bottom'>{emailError}</p>
            </li>
          </ul>
        </div>
        <div className='profile__interaction'>
          <button
            className={`profile__button ${isFormValid ? '' : 'profile__button profile__button_inactive'}`}
            type='button'
            disabled={!isFormValid}
            onClick={handleEdit}
          >
          Редактировать
          </button>
          <button className='profile__button profile__button_color_red' onClick={signOut}>Выйти из аккаунта</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
