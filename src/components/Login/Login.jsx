import React from 'react';
import AuthorizationPage from '../AuthorizationPage/AuthorizationPage';
import AuthorizationForm from '../AuthorizationForm/AuthorizationForm';

const Login = () => {
  return (
    <AuthorizationPage heading='Рады видеть!'>
      <AuthorizationForm isLoginPage={true} buttonText='Войти' questionText='Ещё не зарегистрированы?' linkText='Регистрация'></AuthorizationForm>
    </AuthorizationPage>
  );
}

export default Login;
