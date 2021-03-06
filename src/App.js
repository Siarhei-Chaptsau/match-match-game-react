import React, { Component, Fragment } from 'react';
import Rules from './components/rules/Rules';
import Form from './components/form/Form';
import Cards, {init} from './components/cards/Cards';
import PopupGame from './components/popup/PopupGame';

let ratingList = {};
const fragment = document.createDocumentFragment();
const cardsItem = document.createElement('img');
fragment.appendChild(cardsItem);
cardsItem.classList.add('cards__item');

function compareNumeric(a, b) {
  return b.score - a.score;
}

// функция создания таблицы
function createTable(headRow, ratingTable, ratingList) {
  for (let i = 0; i < 3; i++) { // отрисовываем шапку
    const headCell = document.createElement('th');
    headCell.classList.add('popup__cell');
    if (i === 0) headCell.innerHTML = '№';
    if (i === 1) headCell.innerHTML = 'Name';
    if (i === 2) headCell.innerHTML = 'Score';
    headRow.appendChild(headCell);
  }
  for (let i = 0; i < 10; i++) {
    const tableRow = document.createElement('tr');
    ratingTable.appendChild(tableRow);
    for (let j = 0; j < 3; j++) {
      const tableCell = document.createElement('td');
      if (j === 0) tableCell.innerHTML = `${i + 1}`; // внести номер позиции
      if (j === 1) tableCell.innerHTML = `${ratingList[i].username}`; // внести имя
      if (j === 2) tableCell.innerHTML = `${ratingList[i].score}`; // внести счёт
      tableCell.classList.add('popup__cell');
      tableRow.appendChild(tableCell);
    }
  }
}

// получить запрос
function getScoreFetch() {
  return fetch('https://mmg-score.herokuapp.com/', {
    method: 'GET',
  })
  .then(function(response) {
    return response.json();
  })
  .then((data) => {
    ratingList = data.result;
    ratingList.sort(compareNumeric);
    ratingList = ratingList.slice(0, 10);

    // отрисовываем таблицу результатов
    const popupTable = document.querySelector('.popup__table');
    const ratingTable = document.createElement('table');
    const headRow = document.createElement('tr');
    ratingTable.appendChild(headRow);
    ratingTable.classList.add('popup__table-tag');
    createTable(headRow, ratingTable, ratingList); // создаём таблицу
    popupTable.appendChild(ratingTable);
  })
  .catch((error) => {
    console.log('Request failed', error);
  });
}

// функция вывода поздравлений
export function outputResult() {
  const popupGame = document.querySelector('.popup--game');
  const popupTime = document.querySelector('.popup__title--time'); // поле вывода результата игроку
  const min = document.getElementById('min');
  const sec = document.getElementById('sec');
  const minOfTimer =  parseInt(min.textContent, 10);
  const secOfTimer =  parseInt(sec.textContent.slice(1), 10);
  popupTime.textContent = 10000 - minOfTimer * 60 * 10 - secOfTimer * 10; // вывод результата таймера
  if (!popupGame.classList.contains('popup--show') ) {
    popupGame.classList.add('popup--show');
  }
  getScoreFetch(); // получить запрос жо отправки своих данных
}

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
       startGame: false,
       secondsElapsed: 0,
       minutesElapsed: 0,
       timeElapsedMin: "00",
       timeElapsedSec: ":00"
    }
    this.sendScoreClickHandler = this.sendScoreClickHandler.bind(this);
  }

  tick = () => {
    let min = this.state.minutesElapsed;
    let sec = this.state.secondsElapsed;
    let timeMin = "";
    let timeSec  = "";
    sec++;
    if (sec % 60 === 0) {
      min++;
      sec = 0;
    }
    timeMin = min > 9 ? "" + min : "0" + min;
    timeSec = sec > 9 ? ":" + sec : ":0" + sec;
    this.setState({
      minutesElapsed: min,
      secondsElapsed: sec,
      timeElapsedMin: timeMin,
      timeElapsedSec: timeSec
    });
  }

  startTimer = () => {
    this.interval = setInterval(this.tick, 1000);
  }

  // очистка для таймера
  componentWillUnmount = () => {
    clearInterval(this.interval);
  }

  // обнуление таймера
  reset = () => {
    this.setState({
      secondsElapsed: 0,
      minutesElapsed: 0,
      timeElapsedMin: "00",
      timeElapsedSec: ":00"}
    );
  }

  // начало игры
  startGameClickHandler = () => {
    const cardsItems = document.querySelector('.cards__items');
    const popupGame = document.querySelector('.popup--game');
    const popupTable = document.querySelector('.popup__table');
    cardsItems.innerHTML = ''; // удаление карт
    popupTable.innerHTML = ''; // удаление таблицы
    if (popupGame.classList.contains('popup--show')) {
      popupGame.classList.remove('popup--show');
    }
    this.setState({ startGame: true });
    clearInterval(this.interval); // остановка таймера
    this.reset(); // обнуление таймера
    this.startTimer(); // запуск таймера
    init(cardsItem); // инициализация игры
  }

  // выход из игры
  finishGameClickHandler = () => {
    const cardsItems = document.querySelector('.cards__items');
    const popupGame = document.querySelector('.popup--game');
    this.setState({ startGame: !this.state.startGame }); // выход из игрового поля
    clearInterval(this.interval); // остановка таймера
    this.reset(); // обнуление таймера
    cardsItems.innerHTML = ''; // удаление карт
    if (popupGame.classList.contains('popup--show')) {
      popupGame.classList.remove('popup--show');
    }
  }

  // отправить свой счёт
  sendScoreClickHandler = () => {
    const popupTable = document.querySelector('.popup__table');
    this.postScoreFetch(); // отправить на сервер результаты игры
    setTimeout(function() {
      popupTable.innerHTML = ''; // удаление таблицы
      getScoreFetch(); // получить данных после отправки своего результата
    }, 500);
  }

  // отправить запрос
  postScoreFetch = () => {
    const popupTime = document.querySelector('.popup__title--time');
    let nameUser = document.getElementsByName('firstName')[0].value;
    let emailUser = document.getElementsByName('email')[0].value;
    let scoreUser = Number(popupTime.textContent);
    this.data = {};
    fetch('https://mmg-score.herokuapp.com/', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': 'cors_url',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      username: nameUser,
      email: emailUser,
      score: scoreUser
      })
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      this.data = data;
      console.log(this.data.message);
    })
    .catch(function(error) {
        console.log('Request failed', error);
      });
  }

  render() {
    return (
      <Fragment>
        <section className={this.state.startGame === true ? 'rules--hidden' : 'rules'} >
          <Rules />
        </section>
        <section className={this.state.startGame === true ? 'form--hidden' : 'form'} >
          <Form startGameHandler={this.startGameClickHandler} />
        </section>
        <section className={this.state.startGame === true ? 'cards--show' : 'cards'} >
          <Cards timeElapsedMin={this.state.timeElapsedMin} timeElapsedSec={this.state.timeElapsedSec}
            startTimerClickHandler={this.startTimerClickHandler} finishGameHandler={this.finishGameClickHandler} />
        </section>
        <PopupGame startGameHandler={this.startGameClickHandler}
          finishGameHandler={this.finishGameClickHandler} sendScoreHandler={this.sendScoreClickHandler} />
      </Fragment>
    );
  }
}
