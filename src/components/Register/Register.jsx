import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthorizationPage from '../AuthorizationPage/AuthorizationPage';
import AuthorizationForm from '../AuthorizationForm/AuthorizationForm';
import { register, login } from '../../utils/auth';

const Register = ({ loginUser }) => {
  const navigate = useNavigate();

  const [emailIsUsed, setEmailIsUsed] = useState(false);

  const handleRegistration = (e, formValue) => {
    e.preventDefault();

    const { name, email, password } = formValue;

    register(name, email, password)
    .then(res => {
      const { name: userName, email: userEmail } = res;
      login(userEmail, password)
      .then(res => {
        if (res.ok) {
          setEmailIsUsed(false);
          loginUser(userName, userEmail);
          navigate('/movies', {replace: true});
        }
      })
      .catch(err => {
        console.log('Удалось зарегистрироваться, но не войти', err);
      });
    })
    .catch(err => {
      console.log('Не удалось зарегистрироваться', err);
      if (err === 409) {
        setEmailIsUsed(true);
      }
    })
  }
  
  return (
    <AuthorizationPage heading='Добро пожаловать!'>
      <AuthorizationForm isLoginPage={false} buttonText='Зарегистрироваться' questionText='Уже зарегистрированы?' linkText='Войти' onReg={handleRegistration} emailIsUsed={emailIsUsed}></AuthorizationForm>
    </AuthorizationPage>
  );
}

export default Register;
