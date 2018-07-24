import React, { Component } from 'react';
import './form.css';

export default class FormItemShirt extends Component {
  render() {
    return (
      <li className='form__text'>
        <img className={this.props.className} src={this.props.src} alt={this.props.alt}/>
      </li>
    );
  }
}
