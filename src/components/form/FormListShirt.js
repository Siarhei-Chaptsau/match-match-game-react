import React, { Component } from 'react';
import './form.css';
import FormItemShirt from './FormItemShirt';

export default class FormListShirt extends Component {
  render() {
    let className = 'form__image';
    let classNameActive = 'form__image form__active';
    return (
      <ul className="form__list  form__list--shirt">
        <FormItemShirt className={classNameActive} src='img/0.png' alt='option 1'/>
        <FormItemShirt className={className} src='img/1.png' alt='option 2'/>
        <FormItemShirt className={className} src='img/2.png' alt='option 3'/>
      </ul>
    );
  }
}
