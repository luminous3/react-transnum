import React, { Component } from 'react';
import numbers from './images/numbers.svg';
import {processNumber, isInvalid} from './utils/utils';
import classnames from 'classnames';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      translation: "",
      invalidInput: false
    }
  }

  componentDidMount = () => {
    window.addEventListener('keypress', this.handleKeyPress);
  }

  componentWillUnmount = () => {
    window.removeEventListener('keypress', this.handleKeyPress);
  }

  handleKeyPress = (event) => {
    if(event.charCode === 13) {
      document.getElementById('numberInput').blur();
      this.handleTranslate();
    }
  }

  handleTranslate = () => {
    const {number} = this.state;
    let trans = "";

    if(number === "") {
      return;
    }

    // validity check
    if(isInvalid(number)){
      this.setState({
        invalidInput: true
      });
      document.getElementById('numberInput').blur();
      return;
    } else {
      this.setState({
        invalidInput: false
      });
    }

    if(this.state.number === "0") {
      trans = "Zero";
    } else {
      trans = processNumber(number);
    }

    this.setState({
      translation: trans
    });

  }

  handleInputChange = (e) => {
    this.setState({
      number: e.target.value
    });
  }

  handleFocus = (e) => {
    e.target.value = "";
    e.target.placeholder = "";
  }

  handleBlur = (e) => {
    const input = e.target;
    if(this.state.number !== "") {
      input.value = this.state.number;
      input.placeholder = "";
    } else {
      input.placeholder = "Enter Value";
    }
    input.blur();
  }

  render() {
    const {number, translation, invalidInput} = this.state;
    const inputClass = classnames({'warning': invalidInput});
    return (
      <div className="app-container">
        <header className="header">
          <h1>Number Translator</h1>
          <img src={numbers} className="numbers" alt="numbers" />
          <h6>Translate any number into its word equivalent</h6>
        </header>
        <div className="content">
          <div className="translation">{!invalidInput ? translation : ""}</div>
          {invalidInput &&
            <div className="warning-message">Please enter a valid number (no commas) in the range 0-999999999999, i.e. 123</div>
          }
          <div className="number-container">
            <input id="numberInput"
              className={inputClass}
              placeholder="Enter Value"
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onChange={this.handleInputChange}
              value={number}/>
            <button
              onClick={this.handleTranslate.bind(this)}>
              Translate</button>
          </div>
        </div>

        <footer className="footer">
          2017 | Created with React
        </footer>
      </div>
    );
  }
}

export default App;
