import React from 'react';
import './AboutProject.css'

const AboutProject = () => {
  return (
    <div className='about-project' id='project'>
      <div className="about-project__container">
        <h3 className='about-project__heading'>О проекте</h3>
        <div className="about-project__text-container">
          <div className="about-project__text-item">
            <p className='about-project__title'>Дипломный проект включал 5 этапов</p>
            <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className="about-project__text-item">
            <p className='about-project__title'>На выполнение диплома ушло 5 недель</p>
            <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className="about-project__decor-container">
          <div className="about-project__decor-item">
            <div className="about-project__decor-weeks about-project__decor-weeks_bg_green">1 неделя</div>
            <div className="about-project__decor-text">Back-end</div>
          </div>
          <div className="about-project__decor-item about-project__decor-item_size_grow">
            <div className="about-project__decor-weeks">4 недели</div>
            <div className="about-project__decor-text">Front-end</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutProject;
