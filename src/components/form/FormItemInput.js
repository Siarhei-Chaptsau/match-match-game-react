import React, { Component } from 'react';
import './form.css';

export default class FormItemInput extends Component {  
  render() {
    return (
      <label className="form__item">
        <span className="form__title">{this.props.title}</span>
        <input className="form__input" type={this.props.type} name={this.props.name} placeholder={this.props.placeholderText} required/>
      </label>
    );
  }
}
