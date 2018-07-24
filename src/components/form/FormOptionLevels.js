import React, { Component } from 'react';
import './form.css';
import FormListLevel from './FormListLevel';

export default class FormOptionLevels extends Component {
  render() {
    return (
      <div className="form__option">
        <p className="form__title  form__title--option">Game Difficulty</p>
        <FormListLevel />
      </div>
    );
  }
}
