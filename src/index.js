import 'rxjs'
import React from 'react'
import { createLogger } from 'redux-logger'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { Provider } from 'react-redux'

import rootReducer from './reducers/root.reducer'
import rootEpic from './epics/root.epic'
import { initialiseStart } from './ducks/initialise-app.duck'
import App from './components/containers/App/App'

console.log(`App started in ${process.env.NODE_ENV} mode`);

const epicMiddleware = createEpicMiddleware(rootEpic);

/**
 * Create store with initial state structure
 * and enhance by middleware
 */
//store initial state
const initialState = {
  credentials: {},
  initialiseData: {},
  userAccount: {},
  patients: {},
};

//create store and enhance with middleware
let store;
if (process.env.NODE_ENV === 'production') {
  store = createStore(rootReducer, initialState, applyMiddleware(epicMiddleware))
} else {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(epicMiddleware, createLogger())));
}

//initialisation
store.dispatch(initialiseStart());

render(
  //Provider allows us to receive data from store of our app (by connect function)
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app-root'),
);
