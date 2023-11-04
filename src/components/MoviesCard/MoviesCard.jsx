import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

const MoviesCard = ({ name, imageSrc, duration, isSaved }) => {
  const location = useLocation();

  const isMainPage = location.pathname === '/movies';

  return (
    <div className='movies-card'>
      <div className='movies-card__poster'>
        <img className='movies-card__poster-bg' src={imageSrc} alt={`Постер фильма ${name}`} />
        {
          isMainPage ? isSaved ? (
            <div className='movies-card__button movies-card__button_saved_yes'></div>
          ) :
          (
            <button className='movies-card__button movies-card__button_saved_no'>Сохранить</button>
          ) :
          (
            <button className='movies-card__button movies-card__button_delete'></button>
          )
        }
      </div>
      <div className='movies-card__info'>
        <h3 className='movies-card__name'>{name}</h3>
        <p className='movies-card__duration'>{duration}</p>
      </div>
    </div>
  );
}

export default MoviesCard;