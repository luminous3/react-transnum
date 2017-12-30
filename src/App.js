import React, { Component } from 'react';
import numbers from './numbers.svg';
import './App.css';
import * from'./vars';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      translation: ""
    }
  }

  divide(num, set) {
    return num / set;
  }

  handleTranslate = () => {
    let trans = "";
    const {number} = this.state;
    if(this.state.number === "0") {
      trans = "Zero";
    } else {
      let currValue = number;
      let values = [billion, million, thousand];
      let res = 0;

      values.map((denom) => {
        res = Math.floor(this.divide(currValue, denom));
        if(res) {
          trans += this.translate(res) + " " + denominations[denom] + " ";
        }
        currValue -= res * denom;
      })

      if(currValue) {
        trans += " " + this.translate(currValue);
      }

    }
    this.setState({
      translation: trans
    });
  }

  translate = (number) => {
    let currTrans = "";
    let currValue = parseInt(number, 10);
    let resH = Math.floor(this.divide(currValue, hundred));
    currValue = number - resH * hundred;
    let res10 = Math.floor(this.divide(currValue, ten));
    let res1 = currValue - res10 * ten;

    if(resH) {
      currTrans = ones[resH] + " " + denominations[hundred];
    }
    if(res10) {
      if(resH) {
        currTrans += " and ";
      }
      if(res10 > 1) {
        currTrans += tens[res10];
      } else if(res10 === 1) {
        if(res1 === 0) {
          return currTrans += tens[res10];
        } else {
          return currTrans += teens[res1];
        }
      }
    }
    if(res1) {
      if(resH && !res10) {
        currTrans += " and ";
      }
      currTrans += " " + ones[res1];
    }

    return currTrans;
  }

  handleInputChange = (event) => {
    this.setState({
      number: event.target.value
    });
  }

  render() {
    const {number, translation} = this.state;
    return (
      <div className="app-container">
        <header className="header">
          <h1>Number Translator</h1>
          <img src={numbers} className="numbers" alt="numbers" />
          <h6>Translate any number into its word equivalent</h6>
        </header>
        <div className="content">
          <div className="translation">{translation}</div>
          <div className="number-container">
            <input placeholder="Enter Value"
              onFocus={(e) => e.target.placeholder = ""}
              onBlur={(e) => e.target.placeholder = "Enter Value"}
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
