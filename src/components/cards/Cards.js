import React, { Component, Fragment } from 'react';
import CardsNavContainer from './CardsNavContainer';

import imgCard1 from '../../img/Barney_Gumble.jpg';
import imgCard2 from '../../img/Clancy_Wiggum.jpg';
import imgCard3 from '../../img/Bart_Simpson.jpg';
import imgCard4 from '../../img/Eleanor_Abernathy.jpg';
import imgCard5 from '../../img/Groundskeeper_Willie.jpg';
import imgCard6 from '../../img/Homer_Simpson.jpg';
import imgCard7 from '../../img/Horatio_McCallister.jpg';
import imgCard8 from '../../img/Fat_Tony.jpg';
import imgCard9 from '../../img/Mr_Burns.jpg';
import imgCard10 from '../../img/Moe_Szyslak.jpg';
import imgCard11 from '../../img/Abraham_Simpson.jpg';
import imgCard12 from '../../img/Seymour_Skinner.jpg';

const cards = document.querySelector('.cards');
const cardsItems = document.querySelector('.cards__items');
const cardsBtn = document.querySelector('.cards__btn');
const formImage = document.querySelectorAll('.form__image');
const formItemLevel = document.querySelectorAll('.form__label--level');

let countTime;
let memoryObj = {}; // запоминает какую выбрали рубашку и сложность для игры
let newArrCardsRandomAndSelected = []; // массив рандомных карт согласно опций
const dataOfCards = [
  {dataId: 1, backgroundImage: 'Barney_Gumble.jpg'},
  {dataId: 2, backgroundImage: 'Clancy_Wiggum.jpg'},
  {dataId: 3, backgroundImage: 'Bart_Simpson.jpg'},
  {dataId: 4, backgroundImage: 'Eleanor_Abernathy.jpg'},
  {dataId: 5, backgroundImage: 'Groundskeeper_Willie.jpg'},
  {dataId: 6, backgroundImage: 'Homer_Simpson.jpg'},
  {dataId: 7, backgroundImage: 'Horatio_McCallister.jpg'},
  {dataId: 8, backgroundImage: 'Fat_Tony.jpg'},
  {dataId: 9, backgroundImage: 'Mr_Burns.jpg'},
  {dataId: 10, backgroundImage: 'Moe_Szyslak.jpg'},
  {dataId: 11, backgroundImage: 'Abraham_Simpson.jpg'},
  {dataId: 12, backgroundImage: 'Seymour_Skinner.jpg'}
];

// функция рандомного перемешивания
Array.prototype.shuffle = function() {
  for (let i = this.length - 1; i >= 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let itemAtIndex = this[randomIndex];
    this[randomIndex] = this[i];
    this[i] = itemAtIndex;
  }
  return this;
}

// функция создания рандомного массива согласно выбранного уровня
function randomMixArrays(start, end) {
  let arrCut = dataOfCards.slice(start, end);
  let arrCopy = arrCut.slice();
  newArrCardsRandomAndSelected = arrCut.concat(arrCopy);
  newArrCardsRandomAndSelected.shuffle();
  return newArrCardsRandomAndSelected;
}

// функция отрисовки каждой карты
let renderCard = function (card, index) {
  const newCard = document.createElement('img');
  newCard.dataset.id = newArrCardsRandomAndSelected[index].dataId; // каждой карте даём id
  newCard.dataset.bg = newArrCardsRandomAndSelected[index].backgroundImage; // сохряняем картинку в атрибут data-bg
  newCard.style.backgroundImage = memoryObj.shirt;
  newCard.src = 'img/transparent.png';
  return newCard;
};

// функция добавления карт на поле
let addCards = function () {
  for (let i = 0; i < newArrCardsRandomAndSelected.length; i++) {
    let elem = renderCard(newArrCardsRandomAndSelected[i], i);
    elem.className = 'cards__item  cards__item--medium-difficulty';
    if (newArrCardsRandomAndSelected.length < 18) {
      elem.className = 'cards__item  cards__item--low-difficulty';
    }
    if (newArrCardsRandomAndSelected.length > 18) {
      elem.className = 'cards__item  cards__item--hard-difficulty';
    }
    cardsItems.appendChild(elem); // добавляем карты на поле
  }
};

// функция начала игры
export function init(obj) {
  dataOfCards.shuffle(); // рандомное перемешивание первонач массива
  for (let i = 0; i < formImage.length; i++) { // поменять рубашки согласно наличию form__active
    if (formImage[i].classList.contains('form__active')) {
      obj.style.backgroundImage = "url('./img/" + i + ".png')";
      obj.classList.remove('cards__item--turned'); // у всех карт убрать классы переворачивания
      memoryObj.shirt = obj.style.backgroundImage;  // сохраняем в св-во объекта инфу о выбраной рубашке
    }
  }
  if (formItemLevel[1].classList.contains('form__active')) { // выложить карты согласно наличию form__active
    console.log(dataOfCards);
    randomMixArrays(0, 9); // добавить 18 карт
    //addCards(); // добавление карт на поле
  } else if (formItemLevel[2].classList.contains('form__active')) {
    randomMixArrays(); // добавить 24 карты
    //addCards();
  } else {
    randomMixArrays(0, 5); // добавить 10 карт
    //addCards();
  }
  return memoryObj; // возврат объекта с инфой о выбранной рубашке и уровне сложности
}

export default class Cards extends Component {
  render() {
    return (
      <Fragment>
        <div className="cards__wrapper">
          <CardsNavContainer timeElapsedMin={this.props.timeElapsedMin} timeElapsedSec={this.props.timeElapsedSec}
            startTimerClickHandler={this.startTimerClickHandler} finishGameHandler={this.props.finishGameHandler} />
          <div className="cards__items"></div>
        </div>
      </Fragment>
    );
  }
}
