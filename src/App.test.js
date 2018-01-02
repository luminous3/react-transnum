import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {processNumber} from './utils/utils';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('converts numbers', () => {
  expect(processNumber(123)).toEqual("One hundred and twenty three");
  expect(processNumber(13)).toEqual("Thirteen");
  expect(processNumber(85)).toEqual("Eighty five");
  expect(processNumber(5237)).toEqual("Five thousand two hundred and thirty seven");
  expect(processNumber(212119)).toEqual("Two hundred and twelve thousand one hundred and nineteen");
  expect(processNumber(345019)).toEqual("Three hundred and forty five thousand nineteen");
  expect(processNumber(451201)).toEqual("Four hundred and fifty one thousand two hundred and  one");
  expect(processNumber(906451201)).toEqual("Nine hundred and six million four hundred and fifty one thousand two hundred and  one");
  expect(processNumber(798906451201)).toEqual("Seven hundred and ninety eight billion nine hundred and six million four hundred and fifty one thousand two hundred and one")
});
