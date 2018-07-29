import React, { Component, Fragment } from 'react';
import CardsNavContainer from './CardsNavContainer';
import {outputResult} from '../../App';

import Barney_Gumble from '../../img/Barney_Gumble.jpg';
import Clancy_Wiggum from '../../img/Clancy_Wiggum.jpg';
import Bart_Simpson from '../../img/Bart_Simpson.jpg';
import Eleanor_Abernathy from '../../img/Eleanor_Abernathy.jpg';
import Groundskeeper_Willie from '../../img/Groundskeeper_Willie.jpg';
import Homer_Simpson from '../../img/Homer_Simpson.jpg';
import Horatio_McCallister from '../../img/Horatio_McCallister.jpg';
import Fat_Tony from '../../img/Fat_Tony.jpg';
import Mr_Burns from '../../img/Mr_Burns.jpg';
import Moe_Szyslak from '../../img/Moe_Szyslak.jpg';
import Abraham_Simpson from '../../img/Abraham_Simpson.jpg';
import Seymour_Skinner from '../../img/Seymour_Skinner.jpg';
import shirt1 from '../../img/0.png';
import shirt2 from '../../img/1.png';
import shirt3 from '../../img/2.png';
import transparent from '../../img/transparent.png';
import white from '../../img/white.png';

let firstTurnedCardIndex; // дефолтное значение индекса первой карты
let firstTurnedCardId; // дефолтное значение data-id первой карты
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
const objOfImages = {
  Barney_Gumble: Barney_Gumble,
  Clancy_Wiggum: Clancy_Wiggum,
  Bart_Simpson: Bart_Simpson,
  Eleanor_Abernathy: Eleanor_Abernathy,
  Groundskeeper_Willie: Groundskeeper_Willie,
  Homer_Simpson: Homer_Simpson,
  Horatio_McCallister: Horatio_McCallister,
  Fat_Tony: Fat_Tony,
  Mr_Burns: Mr_Burns,
  Moe_Szyslak: Moe_Szyslak,
  Abraham_Simpson: Abraham_Simpson,
  Seymour_Skinner: Seymour_Skinner
};

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
  newCard.src = transparent;
  return newCard;
};

// функция добавления карт на поле
let addCards = function () {
  const cardsItems = document.querySelector('.cards__items');
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
  const formLabelsShirts = document.querySelectorAll('.form__label--shirt');
  const formLabelsLevels = document.querySelectorAll('.form__label--level');
  dataOfCards.shuffle(); // рандомное перемешивание первонач массива
  for (let i = 0; i < formLabelsShirts.length; i++) { // проверка выбранной рубашки
    obj.classList.remove('cards__item--turned'); // у всех карт убрать классы переворачивания
    if (formLabelsShirts[i].classList.contains('form__label--2')) {
      obj.style.backgroundImage = "url(" + shirt2 + ")";
      memoryObj.shirt = obj.style.backgroundImage;  // сохраняем в св-во объекта инфу о выбраной рубашке
      break;
    } else if (formLabelsShirts[i].classList.contains('form__label--3')) {
      obj.style.backgroundImage = "url(" + shirt3 + ")";
      memoryObj.shirt = obj.style.backgroundImage;
      break;
    } else {
      obj.style.backgroundImage = "url(" + shirt1 + ")";
      memoryObj.shirt = obj.style.backgroundImage;
    }
  }
  if (formLabelsLevels[1].classList.contains('form__active')) { // выложить карты согласно наличию form__active
    console.log(dataOfCards);
    randomMixArrays(0, 9); // добавить 18 карт
    addCards(); // добавление карт на поле
  } else if (formLabelsLevels[2].classList.contains('form__active')) {
    randomMixArrays(); // добавить 24 карты
    addCards();
  } else {
    randomMixArrays(0, 2); // добавить 10 карт
    //randomMixArrays(0, 5); // добавить 10 карт // TODO: вернуть!!
    addCards();
  }
  return memoryObj; // возврат объекта с инфой о выбранной рубашке и уровне сложности
}

// обработчик поворота карты
let turnСardsClickHandler = (e) => {
  e.persist(); // позволит ссылаться на событие
  if (e.target.classList.contains('cards__item--turned') && !e.target.classList.contains('cards__items')) {
    e.target.style.backgroundImage = memoryObj.shirt; // смена картинки на рубашку
    e.target.classList.toggle('cards__item--turned');
    firstTurnedCardId = null; // удаляем id первой карты из глобальной области видимости
    firstTurnedCardIndex = null; // удаляем индекс первой карты из глобальной области видимости

  } else if (!e.target.classList.contains('cards__items')) {
    e.target.classList.toggle('cards__item--turned');
    setTimeout(function() {
      let imageOfCard = e.target.getAttribute('data-bg').slice(0, -4);
      for (let key in objOfImages) {
        if (key === imageOfCard) {
          imageOfCard = objOfImages[key];
        }
      }
      e.target.style.backgroundImage =  "url('" + imageOfCard + "'), url('" + white + "')";
    }, 300);

    const arrOfCards = document.querySelectorAll('.cards__item'); // массив карт
    let count = 0; // счётчик для кол-ва открытых карт

    for (let i = 0; i < arrOfCards.length; i++) {
      if (arrOfCards[i].classList.contains('cards__item--turned')) {
        count++;
      }
      if (count === 1 && arrOfCards[i].classList.contains('cards__item--turned')) { // находим первую открытую карту и сохраняем её id
        if (!firstTurnedCardId) { // если индекса первой карты не задан, то задаём id первой карты
          firstTurnedCardId = arrOfCards[i].getAttribute('data-id');
        }
        if (!firstTurnedCardIndex) { // если индекса первой карты не задан, то задаём
          firstTurnedCardIndex = i;
        }
      }
      if (count === 2) { // если уже есть 2 открытые карты

        if (e.target.getAttribute('data-id') === firstTurnedCardId) { // сравниваем id активной карты и открытой, если они равны
          setTimeout(function() {
            e.target.style.visibility = 'hidden'; // скрываем вторую карту
            e.target.classList.remove('cards__item--turned');
            e.target.classList.remove('cards__item'); // убираем из массива
            arrOfCards[firstTurnedCardIndex].style.visibility = 'hidden'; // скрываем первую карту
            arrOfCards[firstTurnedCardIndex].classList.remove('cards__item--turned');
            arrOfCards[firstTurnedCardIndex].classList.remove('cards__item'); // убираем из массива
            firstTurnedCardId = null; // удаляем id первой карты
            firstTurnedCardIndex = null; // удаляем индекс первой карты из глобальной области видимости
          }, 500);
          if (arrOfCards.length < 4) { // вывод поздравлений игроку
            setTimeout(function() {
              outputResult();
            }, 700);
          }
        } else { // если id не совпали
          setTimeout(function() {
            e.target.style.backgroundImage = memoryObj.shirt; // закрываем вторую карту
            e.target.classList.toggle('cards__item--turned');
            arrOfCards[firstTurnedCardIndex].style.backgroundImage = memoryObj.shirt; // закрываем первую карту
            arrOfCards[firstTurnedCardIndex].classList.toggle('cards__item--turned');
            firstTurnedCardId = null; // удаляем id первой карты из глобальной области видимости
            firstTurnedCardIndex = null; // удаляем индекс первой карты из глобальной области видимости
          }, 700);
        }
        break;
      }
    }
  }
}

export default class Cards extends Component {
  constructor (props) {
    super(props);
    this.state = {
       active: ''
    }
    //this.cardsItems = React.createRef();
  }

  render() {
    //console.log(this.cardsItems.current);
    return (
      <Fragment>
        <div className="cards__wrapper">
          <CardsNavContainer timeElapsedMin={this.props.timeElapsedMin} timeElapsedSec={this.props.timeElapsedSec}
            startTimerClickHandler={this.startTimerClickHandler} finishGameHandler={this.props.finishGameHandler} />
          <div className="cards__items" onClick={(e) => {turnСardsClickHandler(e)}} /*ref={this.cardsItems}*/></div>
        </div>
      </Fragment>
    );
  }
}
