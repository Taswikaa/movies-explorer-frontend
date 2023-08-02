import React from 'react';
import './SearchForm.css'

const SearchForm = () => {
  return (
    <form className='search-form'>
      <div className='search-form__input-field'>
        <input
          type='text'
          placeholder='Фильм'
          className='search-form__input-text'
        />
        <button className='search-form__button'></button>
      </div>
      <div className='search-form__checkbox-field'>
        <input
          type='checkbox'
          className='search-form__input-checkbox'
        />
        <p className='search-form__input-span'>Короткометражки</p>
      </div>
    </form>
  );
}

export default SearchForm;
