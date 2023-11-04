import React from 'react';
import AuthorizationPage from '../AuthorizationPage/AuthorizationPage';
import AuthorizationForm from '../AuthorizationForm/AuthorizationForm';

const Register = () => {
  return (
    <AuthorizationPage heading='Добро пожаловать!'>
      <AuthorizationForm isLoginPage={false} buttonText='Зарегистрироваться' questionText='Уже зарегистрированы?' linkText='Войти'></AuthorizationForm>
    </AuthorizationPage>
  );
}

export default Register;
