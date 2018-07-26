import React, { Component } from 'react';
import './form.css';

export default class FormOptionLevels extends Component {
  constructor (props) {
    super(props);
    this.state = {
       active: ''
    }
  }

  changeLevelHandler = (e) => {
    this.setState({ active:  e.target.value });
  }

  render() {
    let classNamelevel = 'form__label  form__label--level';
    let classNameActive = 'form__label  form__label--level  form__active';
    return (
      <div className="form__option">
        <p className="form__title  form__title--option">Game Difficulty</p>
        <form>
          <label className={this.state.active === 'low' ? classNameActive : classNamelevel}>
            <input type="radio" className='form__text' onClick={this.changeLevelHandler} value='low' />
            <span>Low (5 x 2)</span>
          </label>

          <label className={this.state.active === 'medium' ? classNameActive : classNamelevel}>
            <input type="radio" className='form__text' onClick={this.changeLevelHandler} value='medium' />
            <span>Medium (6 x 3)</span>
          </label>

          <label className={this.state.active === 'hard' ? classNameActive : classNamelevel}>
            <input type="radio" className='form__text' onClick={this.changeLevelHandler} value='hard' />
            <span>Hard (8 x 3)</span>
          </label>
        </form>
      </div>
    );
  }
}
