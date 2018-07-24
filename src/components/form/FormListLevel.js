import React, { Component } from 'react';
import './form.css';

export default class FormListLevel extends Component {
  render() {
    return (
      <ul className="form__list  form__list--level">
        <li className="form__text  form__text--level  form__active">Low (5 x 2)</li>
        <li className="form__text  form__text--level">Medium (6 x 3)</li>
        <li className="form__text  form__text--level">Hard (8 x 3)</li>
      </ul>
    );
  }
}
