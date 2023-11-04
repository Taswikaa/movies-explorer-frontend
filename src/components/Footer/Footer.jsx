import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer__inner-container">
        <h3 className='footer__heading'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <div className='footer__container'>
          <a className='footer__link' href='https://practicum.yandex.ru/' target='_blank' rel='noreferrer'>Яндекс.Практикум</a>
          <a className='footer__link' href='https://github.com/Taswikaa' target='_blank' rel='noreferrer'>Github</a>
          <p className='footer__copy'>&#169; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
