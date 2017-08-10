import { combineReducers } from 'redux';

import fetchAllUsersReducer from './fetch-all-users.reducer';

const dummyReducer = (state = {}) => state;

const rootReducer = combineReducers({
  dummyReducer,
  allUsers: fetchAllUsersReducer,
});

export default rootReducer;
