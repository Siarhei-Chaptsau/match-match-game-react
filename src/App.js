import React, { Component, Fragment } from 'react';
import Rules from './components/rules/Rules';
import Form from './components/form/Form';
import Cards, {init} from './components/cards/Cards';
import PopupGame from './components/popup/PopupGame';

const fragment = document.createDocumentFragment();
const cardsItem = document.createElement('img');
fragment.appendChild(cardsItem);
cardsItem.classList.add('cards__item');

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
  componentWillUnmount = () =>  {
    clearInterval(this.interval);
  }

  // обнуление таймера
  reset () {
    this.setState({
      secondsElapsed: 0,
      minutesElapsed: 0,
      timeElapsedMin: "00",
      timeElapsedSec: ":00"}
    );
  }

  // начало игры
  startGameClickHandler = () => {
    this.setState({ startGame: !this.state.startGame });
    this.startTimer(); // запуск таймера
    init(cardsItem); // инициализация игры
  }

  // выход из игры
  finishGameClickHandler = () => {
    this.setState({ startGame: !this.state.startGame }); // выход из игрового поля
    clearInterval(this.interval); // остановка таймера
    this.reset(); // обнуление таймера
    //cardsItems.innerHTML = ''; // удаление карт
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
        <PopupGame />
      </Fragment>
    );
  }
}
