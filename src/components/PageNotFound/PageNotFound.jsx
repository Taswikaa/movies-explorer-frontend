import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css'

const PageNotFound = () => {
  return (
    <div className='page-not-found'>
      <div className='page-not-found__inner-container'>
        <div className='page-not-found__text-content'>
          <h3 className='page-not-found__title'>404</h3>
          <p className='page-not-found__subtitle'>Страница не найдена</p>
        </div>
        <Link className='page-not-found__link' to='/'>Назад</Link>
      </div>
    </div>
  );
}

export default PageNotFound;
