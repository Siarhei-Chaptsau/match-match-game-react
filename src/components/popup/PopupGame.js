import React, { Component } from 'react';
import './popup.css';

const popupBtnExit = document.querySelector('.popup__btn--exit');
const popupTime = document.querySelector('.popup__title--time'); // поле вывода результата игроку
const popupBtnGame = document.querySelector('.popup__btn--game');
const popupTable = document.querySelector('.popup__table');

const popupGame = document.querySelector('.popup--game');
export const ENTER_KEYCODE = 13;
export const ESC_KEYCODE = 27;

export default class PopupGame extends Component {
  render() {
    return (
      <section className="popup  popup--game">
        <div className="popup__wrapper">
          <h3 className="popup__title">Congratulations!</h3>
          <h3 className="popup__title">Your Time:</h3>
          <p className="popup__title  popup__title--time"></p>
          <div className="popup__table"></div>
          <button className="popup__btn  popup__btn--game" type="submit">New Game</button>
          <button className="popup__btn  popup__btn--exit" type="submit">Exit</button>
        </div>
      </section>
    );
  }
}
