import { React, useState, useEffect } from 'react';
import './Movies.css';
import api from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const Movies = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [settingObject, setSettingObject] = useState({
    movieName: '',
    isShort: false
  });

  useEffect(() => {
    mainApi.getSavedMovies()
    .then(res => {
      setSavedMovies(res);
    })
    .catch(err => {
      console.log('Ошибка получения сохранённых фильмов', err);
    })
  }, []);

  const saveMovie = function(data) {
    const movieData = {};
    Object.assign(movieData, data);
    movieData.thumbnail = `https://api.nomoreparties.co/${data.image.url}`;
    movieData.image = `https://api.nomoreparties.co/${data.image.url}`;
    movieData.movieId = data.id;

    delete movieData.isSaved;
    delete movieData.id;
    delete movieData.created_at;
    delete movieData.updated_at;

    mainApi.saveMovie(movieData)
    .then(res => {
      setSavedMovies([...savedMovies, res]);
    })
    .catch(err => console.log(err, 'ошибка сохранения'))
  }

  const handleSearchMovies = function(name, isShort) {
    if (!name) {
      setSettingObject({
        ...settingObject,
        movieName: ''
      })
      return;
    }

    const lowerString = name.toLowerCase();
    const filteringString = `${lowerString[0].toUpperCase()}${lowerString.slice(1)}`

    setSettingObject({
      ...settingObject,
      movieName: filteringString,
      isShort
    })
  }

  useEffect(() => {
    api.getMovies()
    .then(res => {
      setAllMovies(res);
    })
    .catch(err => {
      console.log('Не удалось получить фильмы из базы данных, ошибка:', err);
    });
  }, []);

  return (
    <div className='movies'>
      <Header />
      <SearchForm handleSearchMovies={handleSearchMovies} />
      <MoviesCardList
        movies={allMovies}
        settingObject={settingObject}
        saveMovie={saveMovie}
        savedMovies={savedMovies}
      />
      <Footer />
    </div>
  );
}

export default Movies;
