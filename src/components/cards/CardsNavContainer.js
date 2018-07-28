import React, { Component } from 'react';

export default class CardsNavContainer extends Component {
  render() {
    return (
      <div className="cards__nav-container">
        <button className="cards__btn" type="submit" onClick={() => {this.props.finishGameHandler()}}>← Go Back</button>
        <p className="cards__text">Your Time:

          <span className="cards__timer">
      	    <span id="min" starttimer={this.startTimerClickHandler}> {this.props.timeElapsedMin}</span>
            <span id="sec" sttarttimer={this.startTimerClickHandler}>{this.props.timeElapsedSec}</span>
          </span>
        </p>
      </div>
    );
  }
}
