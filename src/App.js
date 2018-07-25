import React, { Component, Fragment } from 'react';
import Rules from './components/rules/Rules';
import Form from './components/form/Form';
import Cards from './components/cards/Cards';
import PopupGame from './components/popup/PopupGame';
/*import logo from './logo.svg';
 <img src={logo} />*/

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Rules />
        <Form />
        <Cards />
        <PopupGame />
      </Fragment>
    );
  }
}
