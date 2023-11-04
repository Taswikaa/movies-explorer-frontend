import React from 'react';
import './Promo.css'

const Promo = () => {
  return (
    <div className='promo'>
      <div className="promo__container">
        <h1 className='promo__heading'>Учебный проект студента факультета Веб-разработки.</h1>
        <nav className='promo__links'>
        <a className='promo__link' href="#project">О проекте</a>
        <a className='promo__link' href="#techs">Технологии</a>
        <a className='promo__link' href="#about">Студент</a>
      </nav>
      </div>
    </div>
  );
}

export default Promo;
