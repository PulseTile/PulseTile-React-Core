import React from 'react'
import { createLogger } from 'redux-logger'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducers/root-reducer'
import App from './components/containers/App/App';

console.log(`App started in ${process.env.NODE_ENV} mode`);

/**
 * Create store with initial state structure
 * and enhance by middleware
 */
//store initial state
const initialState = {};

//create store and enhance with middleware
let store;
if (process.env.NODE_ENV === 'production') {
  store = createStore(reducer, initialState)
} else {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(createLogger())));
}

render(
  //Provider allows us to receive data from store of our app (by connect function)
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app-root'),
);
