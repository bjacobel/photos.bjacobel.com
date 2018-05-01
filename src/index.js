/* eslint-disable import/first */
import './polyfills';

import React from 'react';
import ReactDOM from 'react-dom';
/* eslint-enable import/first */

import Routes from './components/Routes';

const rootEl = document.getElementById('main');
const render = () => {
  ReactDOM.render(<Routes />, rootEl);
};

if (module.hot) {
  module.hot.accept('./components/Routes', () => {
    render();
  });
}

render();
