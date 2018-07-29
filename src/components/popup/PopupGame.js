import React, { Component } from 'react';

export default class PopupGame extends Component {
  render() {
    return (
      <section className="popup  popup--game">
        <div className="popup__wrapper">
          <h3 className="popup__title">Congratulations!</h3>
          <h3 className="popup__title">Your Time:</h3>
          <p className="popup__title  popup__title--time"></p>
          <div className="popup__table"></div>
          <button className="popup__btn  popup__btn--game" type="submit" onClick={() => {this.props.startGameHandler()}} >New Game</button>
          <button className="popup__btn  popup__btn--exit" type="submit" onClick={() => {this.props.finishGameHandler()}} >Exit</button>
        </div>
      </section>
    );
  }
}
