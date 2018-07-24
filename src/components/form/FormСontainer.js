import React, { Component } from 'react';
import FormItemInput from './FormItemInput';
import './form.css';

export default class FormСontainer extends Component {
  render() {
    return (
      <form className="form__form-container" method="post">
        <fieldset className="form__items">
          <FormItemInput title='First Name' placeholderText='Your first name *' type='text' name='name' />
          <FormItemInput title='Last Name' placeholderText='Your name last name *' type='text' name='surname' />
          <FormItemInput title='Email' placeholderText='Your email *' type='email' name='email' />
        </fieldset>
      </form>
    );
  }
}
