import { combineReducers } from 'redux';

const dummyReducer = (state = {}) => state;

const rootReducer = combineReducers({
  dummyReducer,
});

export default rootReducer;
