import React, { Component } from 'react';
import './form.css';
import FormСontainer from './FormСontainer';
import FormOptionShirts from './FormOptionShirts';
import FormOptionLevels from './FormOptionLevels';
import FormBtnContainer from './FormBtnContainer';

const form = document.querySelector('.form');
const btn = document.querySelector('.form__btn');
const formListShirt = document.querySelector('.form__list--shirt');
const formImage = document.querySelectorAll('.form__image');
const formListLevel = document.querySelector('.form__list--level');
const formItemLevel = document.querySelectorAll('.form__text--level');

export default class Form extends Component {
  render() {
    return (
      <section className="form">
        <div className="form__wrapper">
          <FormСontainer />
          <div className="form__option-container">
            <FormOptionShirts />
            <FormOptionLevels />
          </div>
          <FormBtnContainer />
        </div>
      </section>
    );
  }
}
