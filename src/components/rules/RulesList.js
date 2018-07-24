import React, { Component } from 'react';

export default class RulesList extends Component {
  render() {
    return (
      <ol className="rules__text-conteiner">
        <li className="rules__text">Select two cards to try to match the pictures.</li>
        <li className="rules__text">If you match the pictures you can go again.</li>
        <li className="rules__text">If they do not match it is the computer turn them.</li>
        <li className="rules__text">The player that find that finds all pairs wins!</li>
      </ol>
    );
  }
}
