import React, { Component } from 'react';
import CardsText from './CardsText';
import './cards.css';

export default class CardsNavContainer extends Component {
  render() {
    return (
      <div className="cards__nav-container">
        <button className="cards__btn" type="submit">← Go Back</button>
        <CardsText />
      </div>
    );
  }
}
