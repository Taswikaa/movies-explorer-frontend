import { React, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import { translateTime } from '../../utils/utils';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = ({ movies, settingObject, saveMovie, savedMovies, deleteMovie }) => {
  const location = useLocation();
  const isPathMovies = location.pathname !== '/movies';

  const [isAllMoviesShown, setIsAllMoviesShown] = useState(false);
  const [allSituableMovies, setAllSituableMovies] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [moviesToShow, setMoviesToShow] = useState(0);
  const [howManyToShow, setHowManyToShow] = useState(0);

  // useEffect(() => {
  //   if (localStorage.getItem('movies')) {
  //     const movies = JSON.parse(localStorage.getItem('movies'));
  //     setAllSituableMovies(state => movies.map((el, i) => {
  //       state[i] = el;
  //     }));
  //   }
  // }, [])

  useEffect(() => {
    allSituableMovies.forEach(el => {
      el.isSaved = savedMovies.some(movie => {
        return movie.movieId === el.id;
      })
    });
  }, [savedMovies]);

  useEffect(() => {
    const windowResize = function() {
      setWindowWidth(window.innerWidth);
    }

    if (windowWidth < 768) setMoviesToShow(5);
    if (windowWidth >= 768 && windowWidth < 1240) setMoviesToShow(8);
    if (windowWidth >= 1240) setMoviesToShow(12);

    window.addEventListener('resize', windowResize);

    return () => {
      window.removeEventListener('resize', windowResize);
    };
  }, []);

  useEffect(() => {
    if (!isAllMoviesShown) {
      if (windowWidth < 1240) setHowManyToShow(2);
      if (windowWidth >= 1240) setHowManyToShow(3);
    }
  }, [windowWidth, isAllMoviesShown, moviesToShow, howManyToShow]);

  const showMoreMovies = function() {
    setMoviesToShow(moviesToShow + howManyToShow);
  }

  useEffect(() => {
    if (allSituableMovies.length <= moviesToShow) {
      setIsAllMoviesShown(true);
    } else {
      setIsAllMoviesShown(false);
    }
  }, [allSituableMovies, moviesToShow]);

  useEffect(() => {
    if (!isPathMovies) {
      if (!settingObject.movieName) {
        setAllSituableMovies([]);

        if (localStorage.getItem('movies') && localStorage.getItem('movieName')) {
          setAllSituableMovies(JSON.parse(localStorage.getItem('movies')))
        } else {
          localStorage.removeItem('movies');
        }

        return;
      }
  
      const ruRegExp = /[а-яё]/i;
        
      const situableMovies = movies.filter(el => {
        return settingObject.movieName.match(ruRegExp) ? el.nameRU.startsWith(settingObject.movieName) : el.nameEN.startsWith(settingObject.movieName);
      });
  
      if (settingObject.isShort) {
        const shortSituableMovies = situableMovies.filter(el => {
          return el.duration <= 40;
        });
  
        setAllSituableMovies(shortSituableMovies);

        localStorage.setItem('movies', JSON.stringify(shortSituableMovies));
        
        return;
      }

      setAllSituableMovies(situableMovies);

      localStorage.setItem('movies', JSON.stringify(situableMovies));
    }
  }, [settingObject]);

  return (
    <div className='movies-card-list'>
      {
        !isPathMovies ? (
          allSituableMovies.length > 0 ? 
            <div className='movies-card-list__inner-container'>
              {
                allSituableMovies.map((el, i) => (
                  (<MoviesCard
                    name={el.nameRU}
                    imageSrc={`https://api.nomoreparties.co/${el.image.url}`}
                    duration={translateTime(el.duration)}
                    isSaved={el.isSaved}
                    key={el.id}
                    isHide={i < moviesToShow ? false : true}
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
        onClick={showMoreMovies}
      >Ещё</button>
    </div>
  );
}

export default MoviesCardList;
