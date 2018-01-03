import React from 'react';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import App from './App';
import {processNumber, isInvalid} from './utils/utils';

configure({adapter: new Adapter( )});

const wrapper = mount(<App />);
const input = wrapper.find('input');
const button = wrapper.find('button');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('state initializes correctly', () => {
  expect(wrapper.state().number).toEqual("");
  expect(wrapper.state().translation).toEqual("");
  expect(wrapper.state().invalidInput).toEqual(false);
});

it('renders input element correctly', () => {
  expect(input.exists()).toEqual(true);
  expect(input.props().placeholder).toEqual("Enter Value");
});

it('renders translate button', () => {
  expect(wrapper.find('button').exists()).toEqual(true);
});

it('converts numbers', () => {
  expect(processNumber(123)).toEqual("One hundred and twenty three");
  expect(processNumber(13)).toEqual("Thirteen");
  expect(processNumber(85)).toEqual("Eighty five");
  expect(processNumber(5237)).toEqual("Five thousand two hundred and thirty seven");
  expect(processNumber(212119)).toEqual("Two hundred and twelve thousand one hundred and nineteen");
  expect(processNumber(345019)).toEqual("Three hundred and forty five thousand nineteen");
  expect(processNumber(451201)).toEqual("Four hundred and fifty one thousand two hundred and one");
  expect(processNumber(906451201)).toEqual("Nine hundred and six million four hundred and fifty one thousand two hundred and one");
  expect(processNumber(798906451201)).toEqual("Seven hundred and ninety eight billion nine hundred and six million four hundred and fifty one thousand two hundred and one")
});

it('handles negative and invalid input', () => {
  expect(isInvalid("$521")).toEqual(true);
  expect(isInvalid("sdfjh")).toEqual(true);
  expect(isInvalid("-12")).toEqual(true);
  expect(isInvalid("9999999999999")).toEqual(true);
  expect(isInvalid("999999999999")).toEqual(false);
  expect(isInvalid("500sh")).toEqual(true);
  expect(isInvalid("123")).toEqual(false);
  expect(isInvalid("0")).toEqual(false);
});
