import React from 'react'
import createLogger from 'redux-logger'
import { render } from 'react-dom'
import { Router } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducers/root-reducer'
import App from './components/App';

console.log(`App started in ${process.env.NODE_ENV} mode`);

/**
 * Create store with initial state structure
 * and enhance by thunks middleware
 */
//store initial state
const initialState = {};

//create store and enchace with middleware
let store;
if (process.env.NODE_ENV === 'development') {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(createLogger())));
} else {
  store = createStore(reducer, initialState)
}

render(
  //Provider allows us to receive data from store of our app (by connect function)
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
