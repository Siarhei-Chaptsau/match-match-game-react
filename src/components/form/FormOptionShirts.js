import React, { Component } from 'react';
import './form.css';
import shirt1 from '../../img/0.png';
import shirt2 from '../../img/1.png';
import shirt3 from '../../img/2.png';

export default class FormOptionShirts extends Component {
  constructor (props) {
    super(props);
    this.state = {
       active: ''
    }
  }

  changeOptionHandler = (e) => {
    this.setState({ active:  e.target.value });
  }

  render() {
    let classNamelevel = 'form__label';
    let classNameActive = 'form__label  form__active';
    return (
      <div className="form__option">
        <p className="form__title  form__title--option">Shirt Cards</p>
        <form>
          <label className={this.state.active === '1' ? classNameActive : classNamelevel}>
            <input type="radio" className='form__text' value='1' onClick={this.changeOptionHandler} />
            <img className='form__image' src={shirt1} alt='option 1'/>
          </label>

          <label className={this.state.active === '2' ? classNameActive : classNamelevel}>
            <input type="radio" className='form__text' value='2' onClick={this.changeOptionHandler} />
            <img className='form__image' src={shirt2} alt='option 2'/>
          </label>

          <label className={this.state.active === '3' ? classNameActive : classNamelevel} >
            <input type="radio" className='form__text' value='3' onClick={this.changeOptionHandler} />
            <img className='form__image' src={shirt3} alt='option 3'/>
          </label>
        </form>
      </div>
    );
  }
}
