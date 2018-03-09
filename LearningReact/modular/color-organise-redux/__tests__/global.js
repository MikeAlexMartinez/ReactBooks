import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import deepFreeze from 'deep-freeze';

Enzyme.configure({ adapter: new Adapter() });

global.Enzyme = Enzyme;
global.React = React;
global._testColors = deepFreeze([
  {
    'id': '8658c1d0-9eda-4a90-95e1-8001e8eb6036',
    'title': 'Ocean Blue',
    'color': '#0070ff',
    'rating': 3,
    'timestamp': 'Sat Mar 12 2016 16:12:09 GMT-0800 (PST)'
  },
  {
    'id': 'f9005b4e-975e-433d-a646-79df172e1dbb',
    'title': 'Tomato',
    'color': '#d10012',
    'rating': 2,
    'timestamp': 'Fri Mar 11 2016 12:00:00 GMT-0800 (PST)'
  },
  {
    'id': '58d9caee-6ea6-4d7b-9984-65b145031979',
    'title': 'Lawn',
    'color': '#67bf4f',
    'rating': 1,
    'timestamp': 'Thu Mar 10 2016 01:11:12 GMT-0800 (PST)'
  }
]);

console.groupCollapsed = jest.fn();
console.log = jest.fn();
console.groupEnd = jest.fn();

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock;
