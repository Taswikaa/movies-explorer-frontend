import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import mainApi from '../../utils/MainApi';
import Main from '../Main/Main'
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { getLoggedUserInfo, logout } from '../../utils/auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: ''
});

  const loginUser = function(name, email) {
    setIsLogin(true);
    setCurrentUser({
      ...currentUser,
      name,
      email
    });
    localStorage.setItem('auth', true);
  }

  const signOut = function() {
    logout()
    .then(() => {
      localStorage.removeItem('auth');
      setIsLogin(false);
      setCurrentUser({});
      navigate('/', { replace: true });
    })
  }

  const updateUserInfo = function(name, email) {
    mainApi.updateUser(name, email)
      .then(res => {
        setCurrentUser({
          ...currentUser,
          name :res.name,
          email: res.email
        })
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getLoggedUserInfo()
    .then(res => {
      const { name, email } = res;
      loginUser(name, email);
      localStorage.setItem('auth', true)
    })
    .catch(err => {
      console.log('Вы не авторизованы', err);
    })
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route path='/signin' element={<Login loginUser={loginUser} />} />
          <Route path='/signup' element={<Register loginUser={loginUser} />} />
          <Route path='/' element={<Main isLogin={isLogin} />} />
          <Route
            path='/profile'
            element={<ProtectedRoute
              element={ Profile }
              signOut={ signOut } 
              isLogin={ isLogin }
              updateUserInfo={ updateUserInfo }
            />}
          />
          <Route
            path='/movies'
            element={<ProtectedRoute
              element={ Movies }
              isLogin={ isLogin }
            />}
          />
          <Route
            path='/saved-movies'
            element={<ProtectedRoute
              element={ SavedMovies }
              isLogin={ isLogin }  
            />}
          />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
