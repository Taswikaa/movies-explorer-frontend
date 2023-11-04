import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthorizationPage from '../AuthorizationPage/AuthorizationPage';
import AuthorizationForm from '../AuthorizationForm/AuthorizationForm';
import { login, getLoggedUserInfo } from '../../utils/auth';

const Login = ({ loginUser }) => {
  const navigate = useNavigate();

  const handleLogin = (e, formValue) => {
    e.preventDefault();

    const { email, password } = formValue;

    console.log(email, password);

    login(email, password)
    .then(res => {
      if (res.ok) {
        getLoggedUserInfo()
        .then(data => {
          const { name, email } = data;
          loginUser(name, email);
          navigate('/movies', {replace: true});
        })
      }
    })
    .catch(err => {
      console.log('Не удалось войти', err);
    })
  }

  return (
    <AuthorizationPage heading='Рады видеть!'>
      <AuthorizationForm isLoginPage={true} buttonText='Войти' questionText='Ещё не зарегистрированы?' linkText='Регистрация' onLogin={handleLogin}></AuthorizationForm>
    </AuthorizationPage>
  );
}

export default Login;
