import React, { Component } from 'react';
import './cards.css';

export default class CardsText extends Component {
  render() {
    return (
      <p className="cards__text">Your Time:
        <span className="cards__timer">
          <span id="min">00</span> : <span id="sec">00</span>
        </span>
      </p>
    );
  }
}
