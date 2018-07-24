import React, { Component } from 'react';
import './popup.css';

const failure = document.querySelector('.popup--failure');
const popupBtnFailure = document.querySelector('.popup__btn--failure');

export default class PopupFailure extends Component {
  render() {
    return (
      <div className="popup  popup--failure">
        <div className="popup__wrapper  popup__wrapper--failure">
          <p className="popup__text  popup__text--failure">Fill in all fields of the form.</p>
          <button className="popup__btn  popup__btn--failure" type="submit">OK</button>
        </div>
      </div>
    );
  }
}
