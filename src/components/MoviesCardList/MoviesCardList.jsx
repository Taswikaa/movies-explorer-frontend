import { React, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import { translateTime } from '../../utils/utils';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import * as sizes from '../../utils/constants';
import useMediaQuery from '../../hooks/useMediaQuery';

const MoviesCardList = ({ movies, allMovies, settingObject, saveMovie, savedMovies, deleteMovie, savedMoviesIds }) => {
  const location = useLocation();
  const isPathMovies = location.pathname !== '/movies';

  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const isTablet = useMediaQuery("(min-width: 768px)");

  const initialMovies = isDesktop
    ? sizes.DESKTOP_INITIAL_MOVIES
    : isTablet
    ? sizes.TABLET_INITIAL_MOVIES
    : sizes.MOBILE_INITIAL_MOVIES;

  const [visibleMovies, setVisibleMovies] = useState(initialMovies);
  const [isAllMoviesShown, setIsAllMoviesShown] = useState(false);

  const calculateMovies = function() {
    if (isDesktop) {
      return setVisibleMovies(visibleMovies  + sizes.DESKTOP_MOVIES_LOAD);
    }

    if (isTablet) {
      return setVisibleMovies(visibleMovies  + sizes.TABLET_MOVIES_LOAD);
    }

    setVisibleMovies(visibleMovies  + sizes.TABLET_MOVIES_LOAD);
  }

  const hanleLoadMore = function() {
    calculateMovies();
  }

  useEffect(() => {
    if (!isPathMovies) {
      if (allMovies.length <= visibleMovies) {
        setIsAllMoviesShown(true);
      } else {
        setIsAllMoviesShown(false);
      }
    }
  }, [allMovies, visibleMovies])

  return (
    <div className='movies-card-list'>
      {
        !isPathMovies ? (
          allMovies.length > 0 ? 
            <div className='movies-card-list__inner-container'>
              {
                allMovies.slice(0, visibleMovies).map((el, i) => (
                  (<MoviesCard
                    name={el.nameRU}
                    imageSrc={`https://api.nomoreparties.co/${el.image.url}`}
                    duration={translateTime(el.duration)}
                    isSaved={savedMoviesIds.some(id => {
                      return id === el.id;
                    })}
                    key={el.id}
                    movieData={el}
                    saveMovie={saveMovie}
                    deleteMovie={deleteMovie}
                    savedMovies={savedMovies}
                  />)
                ))
              }
            </div> :
            settingObject.movieName ? 
            <p className='movies-card-list__not-found'>Ничего не найдено</p> : 
            <Preloader />
        ) :
        (
          movies.length > 0 ? 
          <div className='movies-card-list__inner-container'>
            {
              !settingObject.isShort ? movies.map(el => (
                (<MoviesCard
                  name={el.nameRU}
                  imageSrc={el.image}
                  duration={translateTime(el.duration)}
                  key={el._id}
                  movieId={el._id}
                  deleteMovie={deleteMovie}
                  movieData={el}
                />)
              )) : 
              movies.filter(el => el.duration <= 40).map(el => (
                (<MoviesCard
                  name={el.nameRU}
                  imageSrc={el.image}
                  duration={translateTime(el.duration)}
                  key={el._id}
                  movieId={el._id}
                  deleteMovie={deleteMovie}
                  movieData={el}
                />)
              ))
            }
          </div> :
          <p className='movies-card-list__not-found'>Ничего не найдено</p>
        )
      }
      <button
        className={`movies-card-list__load-button ${(isPathMovies || isAllMoviesShown) ? 'movies-card-list__load-button_disabled' : ''}`}
        disabled={isPathMovies || isAllMoviesShown}
        onClick={hanleLoadMore}
      >Ещё</button>
    </div>
  );
}

export default MoviesCardList;
