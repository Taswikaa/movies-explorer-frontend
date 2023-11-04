import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import filmPoster from '../../images/film-poster.jpg'
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = () => {
  const location = useLocation();

  const isPathMovies = location.pathname !== '/movies';

  return (
    <div className='movies-card-list'>
      <div className='movies-card-list__inner-container'>
        <MoviesCard name='33 слова о дизайне' imageSrc={filmPoster} duration='1ч 17м' isSaved={true} />
        <MoviesCard name='33 слова о дизайне' imageSrc={filmPoster} duration='1ч 17м' isSaved={false} />
        <MoviesCard name='33 слова о дизайне' imageSrc={filmPoster} duration='1ч 17м' isSaved={false} />
        <MoviesCard name='33 слова о дизайне' imageSrc={filmPoster} duration='1ч 17м' isSaved={true} />
        <MoviesCard name='33 слова о дизайне' imageSrc={filmPoster} duration='1ч 17м' isSaved={false} />
        <MoviesCard name='33 слова о дизайне' imageSrc={filmPoster} duration='1ч 17м' isSaved={false} />
        <MoviesCard name='33 слова о дизайне' imageSrc={filmPoster} duration='1ч 17м' isSaved={true} />
        <MoviesCard name='33 слова о дизайне' imageSrc={filmPoster} duration='1ч 17м' isSaved={false} />
        <MoviesCard name='33 слова о дизайне' imageSrc={filmPoster} duration='1ч 17м' isSaved={false} />
        <MoviesCard name='33 слова о дизайне' imageSrc={filmPoster} duration='1ч 17м' isSaved={false} />
        <MoviesCard name='33 слова о дизайне' imageSrc={filmPoster} duration='1ч 17м' isSaved={true} />
        <MoviesCard name='33 слова о дизайне' imageSrc={filmPoster} duration='1ч 17м' isSaved={false} />
      </div>
      <button
        className={`movies-card-list__load-button ${isPathMovies ? 'movies-card-list__load-button_disabled' : ''}`} disabled={isPathMovies}>Ещё</button>
    </div>
  );
}

export default MoviesCardList;
