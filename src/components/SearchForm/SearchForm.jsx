import { React, useState, useEffect } from 'react';
import './SearchForm.css';

const SearchForm = ({ handleSearchMovies }) => {
  const [movieName, setMovieName] = useState('');
  const [isShortMovie, setIsShortMovie] = useState(false);
  
  const handleInput = function(e) {
    setMovieName(e.target.value);
  }

  const handleSwitchCheckbox = function() {
    setIsShortMovie(!isShortMovie);
  }

  const handleSubmit = function(e) {
    e.preventDefault();

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
          />
          <span className='checkbox__mark'></span>
          <p className='search-form__input-span'>Короткометражки</p>
        </label>
      </div>
    </form>
  );
}

export default SearchForm;
