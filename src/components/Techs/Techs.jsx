import React from 'react';
import './Techs.css'

const Techs = () => {
  return (
    <div className='techs' id='techs'>
      <div className="techs__inner-container">
        <h3 className='techs__heading'>Технологии</h3>
        <p className='techs__title'>7 технологий</p>
        <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <div className='techs__container'>
          <div className='techs__item'>HTML</div>
          <div className='techs__item'>CSS</div>
          <div className='techs__item'>JS</div>
          <div className='techs__item'>React</div>
          <div className='techs__item'>Git</div>
          <div className='techs__item'>Express.js</div>
          <div className='techs__item'>mongoDB</div>
        </div>
      </div>
    </div>
  );
}

export default Techs;
