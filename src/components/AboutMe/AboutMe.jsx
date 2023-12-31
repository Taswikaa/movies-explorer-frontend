import React from 'react';
import './AboutMe.css'
import studentPhoto from '../../images/student.jpg'
import linkImage from '../../images/link-arrow.svg'

const AboutMe = () => {
  return (
    <div className='about-me'>
      <div className="about-me__inner-container">
        <h3 className='about-me__heading' id='about'>Студент</h3>
        <div className='about-me__container'>
          <img className='about-me__photo' src={studentPhoto} alt="студент" />
          <div className='about-me__info'>
            <p className='about-me__title'>Виталий</p>
            <p className='about-me__subtitle'>Фронтенд-разработчик, 30 лет</p>
            <p className='about-me__text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
            <a className='about-me__gh-link' href='https://github.com/Taswikaa' target='_blank' rel='noreferrer'>Github</a>
          </div>
        </div>
        <div className='portfolio'>
          <h3 className='portfolio__heading'>Портфолио</h3>
          <div className='portfolio__list'>
            <a className='portfolio__item' href='https://github.com/Taswikaa/how-to-learn' target='_blank' rel='noreferrer'>
              <p className='portfolio__link-text'>Статичный сайт</p>
              <img className='portfolio__link-img' src={linkImage} alt="" />
            </a>
            <a className='portfolio__item' href='https://github.com/Taswikaa/russian-travel' target='_blank' rel='noreferrer'>
              <p className='portfolio__link-text'>Адаптивный сайт</p>
              <img className='portfolio__link-img' src={linkImage} alt="" />
            </a>
            <a className='portfolio__item portfolio__item_last' href='https://github.com/Taswikaa/react-mesto-auth' target='_blank' rel='noreferrer'>
              <p className='portfolio__link-text'>Одностраничное приложение</p>
              <img className='portfolio__link-img' src={linkImage} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
