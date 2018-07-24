import React, { Component } from 'react';
import RulesList from './RulesList';
import './rules.css';

const rules = document.querySelector('.rules');

export default class Rules extends Component {
  render() {
    return (
      <section className="rules">
        <div className="rules__wrapper">
          <h1 className="rules__title">How to play Match Match Game</h1>
          <p className="rules__text  rules__text--general">Memory is a counter game where
             the object is to find pairs. <span>When</span> the game begins, all pictures are hidden.</p>
          <p className="rules__text  rules__text--general">Please do not forget to choose a card shirt and the difficulty level of the game.</p>
          <h2 className="rules__title  rules__title--play">To Play:</h2>
          <RulesList />
        </div>
      </section>
    );
  }
}
