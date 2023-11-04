import { React } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

const MoviesCard = ({ name, imageSrc, duration, savedMovies, movieData, saveMovie, deleteMovie, movieId, isSaved }) => {
  const location = useLocation();

  const isMainPage = location.pathname === '/movies';

  return (
    <div className='movies-card'>
      <div className='movies-card__poster'>
        <a href={movieData.trailerLink} target='_blank' rel='noreferrer'>
          <img className='movies-card__poster-bg' src={imageSrc} alt={`Постер фильма ${name}`} />
        </a>
        {
          isMainPage ? isSaved ? (
            <div
              className='movies-card__button movies-card__button_saved_yes'
              onClick={() => {
                savedMovies.forEach(el => {
                  if (el.nameRU === movieData.nameRU) {
                    deleteMovie(el._id);
                  }
                })
              }}>
            </div>
          ) :
          (
            <button className='movies-card__button movies-card__button_saved_no' onClick={() => {
              saveMovie(movieData);
            }}>Сохранить</button>
          ) :
          (
            <button
              className='movies-card__button movies-card__button_delete'
              onClick={() => {
                deleteMovie(movieId);
              }}
            ></button>
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