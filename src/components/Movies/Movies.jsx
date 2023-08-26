import { React, useState, useEffect } from 'react';
import './Movies.css';
import api from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import useEffectAfterMount from '../../hooks/useEffectAfterMount';

const Movies = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [allSituableMovies, setAllSituableMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [settingObject, setSettingObject] = useState({
    movieName: '',
    isShort: false
  });
  const [savedMoviesIds, setSavedMoviesIds] = useState([]);
  const [isNoSearch, setIsNoSearch] = useState(true);

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
      setSavedMovies(state => [...state, res]);
      setSavedMoviesIds([...savedMoviesIds, res.movieId])
    })
    .catch(err => console.log(err, 'ошибка сохранения'));
  }

  const deleteMovie = function(id) {
    mainApi.deleteSavedMovie(id)
    .then(res => {
      const newSavedMovies = savedMovies.filter(el => {
        return el.movieId !== res.movieId;
      })
      setSavedMovies(newSavedMovies);
      setSavedMoviesIds(newSavedMovies.map(el => el.movieId))
    })
    .catch(err => console.log(err))
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

  const switchShorts = function(isShort) {
    setSettingObject({
      ...settingObject,
      isShort
    })
  }

  useEffect(() => {
    api.getMovies()
    .then(data => {
      setAllMovies(state => [...state, ...data]);
    })
  }, []);

  useEffectAfterMount(() => {
    
    if (localStorage.getItem('movieName') && isNoSearch) {
      let movieName = localStorage.getItem('movieName').toLowerCase();
      movieName = `${movieName[0].toUpperCase()}${movieName.slice(1, )}`

      console.log(movieName);

      setSettingObject({
        ...settingObject,
        movieName
      })
      setIsNoSearch(false);
    }

    if (!settingObject.movieName) {
      setAllSituableMovies([]);

      return;
    }

    const ruRegExp = /[а-яё]/i;

    const catchedMovies = allMovies.filter(el => {
      return settingObject.movieName.match(ruRegExp) ? el.nameRU.startsWith(settingObject.movieName) : el.nameEN.startsWith(settingObject.movieName);
    });

    if (settingObject.isShort) {
      const shortCatchedMovies = catchedMovies.filter(el => {
        return el.duration <= 40;
      });

      setAllSituableMovies(shortCatchedMovies);

      return;
    }

    setAllSituableMovies(catchedMovies);

  }, [settingObject])

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(localStorage.getItem('movies'));
      setAllSituableMovies(movies);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(allSituableMovies));
  }, [allSituableMovies])

  useEffect(() => {
    mainApi.getSavedMovies()
    .then(data => {
      setSavedMovies(state => [...state, ...data]);
      const ids = data.map(el => {
        return el.movieId;
      })
      setSavedMoviesIds(ids);
    })
  }, []);

  return (
    <div className='movies'>
      <Header />
      <SearchForm
        handleSearchMovies={handleSearchMovies}
        switchShorts={switchShorts}
      />
      <MoviesCardList
        allMovies={allSituableMovies}
        savedMovies={savedMovies}
        settingObject={settingObject}
        saveMovie={saveMovie}
        savedMoviesIds={savedMoviesIds}
        deleteMovie={deleteMovie}
      />
      <Footer />
    </div>
  );
}

export default Movies;
