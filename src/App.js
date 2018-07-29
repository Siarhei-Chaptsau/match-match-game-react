import React, { Component, Fragment } from 'react';
import Rules from './components/rules/Rules';
import Form from './components/form/Form';
import Cards, {init} from './components/cards/Cards';
import PopupGame from './components/popup/PopupGame';

let ratingList = []; // массив всех результатов
let ratingItem = []; // массив куда запишем имя и время

const fragment = document.createDocumentFragment();
const cardsItem = document.createElement('img');
fragment.appendChild(cardsItem);
cardsItem.classList.add('cards__item');

// функция вывода поздравлений
export function outputResult() {
  const popupTable = document.querySelector('.popup__table');
  const popupGame = document.querySelector('.popup--game');
  const popupTime = document.querySelector('.popup__title--time'); // поле вывода результата игроку
  const minOfTimer = document.getElementById('min');
  const secOfTimer = document.getElementById('sec');

  popupTime.textContent = minOfTimer.textContent + secOfTimer.textContent; // вывод результата таймера
  if (!popupGame.classList.contains('popup--show') ) {
    popupGame.classList.add('popup--show');
  }

  // добавляем время игрока в массив и сохраняем таблицу 10-ти лучших в хранилище
  //ratingList = JSON.parse(window.localStorage.getItem('ratingList')); // вернёт массив значений лежащих в хранилище
  if (!ratingList) {
    ratingList = [];
  }
  if (ratingList.length === 10) {
    ratingList.sort(function(a, b) {
      return a[1] - b[1];
    });
    ratingList = ratingList.slice(0, 9);
  }

  let nameUser = document.getElementsByName('firstName')[0].value;
  let scoreUser = minOfTimer.textContent + secOfTimer.textContent; // перевод в секунды
  ratingItem[0] = nameUser;
  ratingItem[1] = scoreUser;
  ratingList.push(ratingItem);

  if ((ratingList.length > 0) && ratingList[ratingList.length - 1][1] > scoreUser) {
    ratingList[ratingList.length - 1][0] = nameUser;
    ratingList[ratingList.length - 1][1] = scoreUser;
  }
  if (ratingList.length > 1) {
    ratingList.sort(function(a, b) {
      return b[1] - a[1];
    });
  }
  // window.localStorage.setItem('ratingList', JSON.stringify(ratingList)); // в хранилище будет добавлено значение

  // отрисовываем таблицу результатов
  const ratingTable = document.createElement('table');
  const headRow = document.createElement('tr');
  ratingTable.appendChild(headRow);
  ratingTable.classList.add('popup__table-tag');

  // отрисовываем шапку
  for (let i = 0; i < 3; i++) {
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
      if (ratingList[i]) {
        if (j === 1) tableCell.innerHTML = `${ratingList[i][0]}`; // внести имя
        if (j === 2) tableCell.innerHTML = `${ratingList[i][1]}`; // внести время
      }
      tableCell.classList.add('popup__cell');
      tableRow.appendChild(tableCell);
    }
  }
  popupTable.appendChild(ratingTable);
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
    //this.cards = React.createRef();
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

  // начало игры повторно
  startGameAgainClickHandler = () => {
    //debugger;
    this.scorePostFetch(); // отправить на сервер результаты игры
    this.startGameClickHandler();
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

  finishSuccessGameClickHandler = () => {
    this.scorePostFetch(); // отправить на сервер результаты игры
    this.finishGameClickHandler();
  }

  // отправить запрос
  scorePostFetch = () => {
    let nameUser = document.getElementsByName('firstName')[0].value;
    let emailUser = document.getElementsByName('email')[0].value;
    const minOfTimer = document.getElementById('min');
    const secOfTimer = document.getElementById('sec');
    let scoreUser = this.state.minutesElapsed * 60 + this.state.secondsElapsed; // перевод в секунды
    //let scoreUser = /*1000 - */ minOfTimer.textContent * 60 + secOfTimer.textContent;
    console.log(scoreUser);
    this.data = {};
    fetch('https://mmg-score.herokuapp.com/', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': 'cors_url',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      //username: "36",
      //email: "ss36@ss.ru",
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

  // получить запрос
  scoreGetFetch = () => {
    return fetch('https://mmg-score.herokuapp.com/', {
      method: 'GET',
    })
    .then(function(response) {
      return response.json();
    })
    .then((data) => {
      this.setState({
        value: this.data,
      })
      this.data.result.map((curr,index) => (
        console.log(this.data.result[index].username,
                    this.data.result[index].email,
                    this.data.result[index].score)
      ));
    })
    .catch((error) => {
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
            startTimerClickHandler={this.startTimerClickHandler} finishGameHandler={this.finishGameClickHandler}  /*ref={this.cards}*/ />
        </section>
        <PopupGame startGameAgainHandler={this.startGameAgainClickHandler} finishGameHandler={this.finishSuccessGameClickHandler} />
      </Fragment>
    );
  }
}
