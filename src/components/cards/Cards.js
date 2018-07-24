import React, { Component } from 'react';
import CardsNavContainer from './CardsNavContainer';
import './cards.css';

const cards = document.querySelector('.cards');
const cardsItems = document.querySelector('.cards__items');
const cardsBtn = document.querySelector('.cards__btn');
const timeInSeconds = document.getElementById('sec');
const timeInMinutes = document.getElementById('min');
let countTime;

export default class Cards extends Component {
  render() {
    return (
      <section className="cards">
        <div className="cards__wrapper">
          <CardsNavContainer />
          <div className="cards__items"></div>
        </div>
      </section>
    );
  }
}
