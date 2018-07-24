import React, { Component } from 'react';
import './form.css';
import FormListShirt from './FormListShirt';

export default class FormOptionShirts extends Component {
  render() {
    return (
      <div className="form__option">
        <p className="form__title  form__title--option">Shirt Cards</p>
        <FormListShirt />
      </div>
    );
  }
}
