import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

const SearchForm = ({ handleSearchMovies, switchShorts, }) => {
  const location = useLocation();

  const isMoviesPath = location.pathname === '/movies';

  const [movieName, setMovieName] = useState('');
  const [isShortMovie, setIsShortMovie] = useState(false);

  useEffect(() => {
    if (isMoviesPath) {
      if (localStorage.getItem('movieName')) {
        setMovieName(localStorage.getItem('movieName'));
      }

      if (localStorage.getItem('isMoviesShort')) {
        setIsShortMovie(true);
      }
    }
  }, [])
  
  const handleInput = function(e) {
    setMovieName(e.target.value);
  }

  const handleSwitchCheckbox = function() {
    setIsShortMovie(!isShortMovie);
    switchShorts(!isShortMovie);
    !isShortMovie ? localStorage.setItem('isMoviesShort', true) : localStorage.removeItem('isMoviesShort');
  }

  const handleSubmit = function(e) {
    e.preventDefault();

    if (isMoviesPath) {
      movieName ? localStorage.setItem('movieName', movieName) : localStorage.removeItem('movieName');
    }

    return handleSearchMovies(movieName, isShortMovie);
  }

  return (
    <form className='search-form' onSubmit={handleSubmit}>
      <div className='search-form__input-field'>
        <input
          type='text'
          placeholder='Фильм'
          className='search-form__input-text'
          value={movieName}
          onChange={handleInput}
        />
        <button className='search-form__button'></button>
      </div>
      <div className='search-form__checkbox-field'>
        <label className='search-form__wrap'>
          <input
            type='checkbox'
            className='search-form__input-checkbox'
            onChange={handleSwitchCheckbox}
            checked={isShortMovie}
          />
          <span className='checkbox__mark'></span>
          <p className='search-form__input-span'>Короткометражки</p>
        </label>
      </div>
    </form>
  );
}

export default SearchForm;
