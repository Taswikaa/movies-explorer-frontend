import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AuthorizationForm.css';

const AuthorizationForm = ({ isLoginPage, buttonText, questionText, linkText, onReg, onLogin, emailIsUsed }) => {

  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
    name: ''
  });

  const [emailTouched, setEmailTouched] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [emailError, setEmailError] = useState('Обязательное поле');
  const [nameError, setNameError] = useState('Обязательное поле');
  const [passwordError, setPasswordError] = useState('Обязательное поле');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleBlur = function(e) {
    switch (e.target.name) {
      case 'email':
        setEmailTouched(true);
        break;
      case 'password':
        setPasswordTouched(true);
        break;
      case 'name':
        setNameTouched(true);
        break;
      default:
        break;
    }
  }

  const validateEmail = function(e) {
    const regExp = /^\w+@[a-z_]+?\.[a-z]{2,3}$/i;
    if (!regExp.test(e.target.value)) {
      setEmailError('Неверный адрес почты')
    } else {
      setEmailError('');
    }
  }

  const validatePassword = function(e) {
    if (!e.target.value) {
      setPasswordError('Обязательное поле');
    } else {
      setPasswordError('');
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

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  useEffect(() => {
    if (emailError || passwordError || (nameError && !isLoginPage)) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [nameError, emailError, passwordError, isLoginPage]);

  useEffect(() => {
    setEmailError('Эта почта уже используется');
  }, [emailIsUsed])

  return (
    <form className='authorization-form' onSubmit={(e) => {
      isLoginPage ? onLogin(e, formValue) : onReg(e, formValue);
    }}>
      <div className="authorization-form__container">
        <div className='authorization-form__inner-container'>
          {!isLoginPage && (
            <div className='authorization-form__input-field'>
              <p className='authorization-form__input-title'>Имя</p>
              <input
                onBlur={(e) => handleBlur(e)}
                className='authorization-form__input'
                maxLength={30}
                type='text'
                placeholder='Введите имя'
                name='name'
                value={formValue.name}
                onChange={(e) => {
                  handleChange(e);
                  validateName(e);
                }}
                required
              />
              {(nameTouched && nameError) && <p className='authorization-form__input-error'>{nameError}</p>}
            </div>
          )}
          <div className='authorization-form__input-field'>
            <p className='authorization-form__input-title'>E-mail</p>
            <input
              onBlur={(e) => handleBlur(e)}
              className='authorization-form__input'
              type='text'
              placeholder='Введите адрес'
              name='email'
              value={formValue.email}
              onChange={(e) => {
                handleChange(e);
                validateEmail(e);
              }}
              required
            />
            {(emailTouched && emailError) && <p className='authorization-form__input-error'>{emailError}</p>}
          </div>
          <div className='authorization-form__input-field'>
            <p className='authorization-form__input-title'>Пароль</p>
            <input
              onBlur={(e) => handleBlur(e)}
              className='authorization-form__input'
              type='password'
              placeholder='Введите пароль'
              name='password'
              value={formValue.password}
              onChange={(e) => {
                handleChange(e);
                validatePassword(e);
              }}
              required
            />
            {(passwordTouched && passwordError) && <p className='authorization-form__input-error'>{passwordError}</p>}
          </div>
        </div>
        <div className='authorization-form__interaction'>
          <button
            className={`authorization-form__submit-button ${isFormValid ? '' : 'authorization-form__submit-button_disabled'}`}
            disabled={!isFormValid}
            type='submit'>
          {buttonText}</button>
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
