import React, { Component } from 'react';
import FormOptionShirts from './FormOptionShirts';
import FormOptionLevels from './FormOptionLevels';
import './form.css';

/*const rules = document.querySelector('.rules');
const cards = document.querySelector('.cards');
const form = document.querySelector('.form');
const btn = document.querySelector('.form__btn');
const formListShirt = document.querySelector('.form__list--shirt');
const formImage = document.querySelectorAll('.form__image');
const formListLevel = document.querySelector('.form__list--level');
const formItemLevel = document.querySelectorAll('.form__text--level');*/

export default class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      firstNameValid: false,
      lastNameValid: false,
      emailValid: false,
      formValid: false,
      activeBtn: false
    }
    this.addActiveClassBtn= this.addActiveClassBtn.bind(this);
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(
      {[name]: value}, () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let firstNameValid = this.state.firstNameValid;
    let lastNameValid = this.state.lastNameValid;
    let emailValid = this.state.emailValid;

    switch(fieldName) {
      case 'firstName':
        firstNameValid = value.length >= 2;
        break;

      case 'lastName':
        lastNameValid = value.length >= 3;
        break;

      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        break;
      default: break;
    }
    this.setState({ firstNameValid: firstNameValid, lastNameValid: lastNameValid, emailValid: emailValid }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.firstNameValid && this.state.lastNameValid && this.state.emailValid });
  }

  addActiveClassBtn() { this.setState({activeBtn: true }); } /* добавления класса для активной кнопки при клике*/

  /*startGameClickHandler = (e) => {
    e.preventDefault();
    if (document.getElementsByName('firstName')[0].value
    && document.getElementsByName('lastName')[0].value
    && document.getElementsByName('email')[0].value) {
      rules.style.display = 'none';
      form.style.display = 'none';
      cards.style.display = 'block';
      //init(cardsItem); // инициализация игры
      //countTime = setInterval(calcTime, 1000); // запуск таймера
    }
  }*/

  render() {
    return (
      <section className="form">
        <div className="form__wrapper">
        <form className="form__form-container" method="post">
          <fieldset className="form__items">
            <label className="form__item">
              <span className="form__title">First Name</span>
              <input className="form__input" type="text" name="firstName" placeholder='Your first name *'
                     value={this.state.firstName} onChange={this.handleUserInput} required />
            </label>
            <label className="form__item">
              <span className="form__title">Last Name</span>
              <input className="form__input" type="text" name="lastName" placeholder='Your name last name *'
                      value={this.state.lastName} onChange={this.handleUserInput} required />
            </label>
            <label className="form__item">
              <span className="form__title">Email</span>
              <input className="form__input" type="email" name='email' placeholder='Your email *'
                     value={this.state.email} onChange={this.handleUserInput} required />
            </label>
          </fieldset>
        </form>

          <div className="form__option-container">
            <FormOptionShirts />
            <FormOptionLevels />
          </div>

          <div className="form__btn-container">
            <button className={this.state.activeBtn ? 'form__btn  form__btn-active' : 'form__btn'} onClick={this.addActiveClassBtn}
                    type="submit" disabled={!this.state.formValid} /*onClick={this.startGameClickHandler}*/>
                START GAME
            </button>
          </div>
        </div>
      </section>
    );
  }
}
