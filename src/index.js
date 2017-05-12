import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import './stylesheets';

import reducer from './reducers';
import { showDevTools } from './constants';

const composeEnhancers = (showDevTools && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;  // eslint-disable-line max-len, no-underscore-dangle

const store = createStore(reducer, {}, composeEnhancers(
  applyMiddleware(...[thunk])
));

const history = syncHistoryWithStore(browserHistory, store);

const render = () => {
  const Main = require('./components/Main').default; // eslint-disable-line global-require

  ReactDOM.render(
    <Provider store={ store }>
      <div>
        <Router history={ history }>
          <Route path="/:collection" component={ Main } />
          <Route path="/" component={ Main } />
        </Router>
      </div>
    </Provider>,
    document.getElementById('main')
  );
};

if (module.hot) {
  module.hot.accept('./components/Main', () => {
    render();
  });
}

render();

