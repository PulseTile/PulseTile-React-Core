import { combineReducers } from 'redux';

import fetchAllUsersReducer from './fetch-all-users.reducer'
import fetchUserAccountReducer from '../ducks/fetch-user-account.duck'

const dummyReducer = (state = {}) => state;

const rootReducer = combineReducers({
  dummyReducer,
  allUsers: fetchAllUsersReducer,
  userAccount: fetchUserAccountReducer,
});

export default rootReducer;
