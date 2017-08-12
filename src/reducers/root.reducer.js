import { combineReducers } from 'redux';

import fetchInitialiseReducer from '../ducks/fetch-initialise.duck'
import setCredentialsREducer from '../ducks/set-credentials.duck'
import fetchPatientsReducer from '../ducks/feth-patients.duck'
import fetchUserAccountReducer from '../ducks/fetch-user-account.duck'

const rootReducer = combineReducers({
  initialiseData: fetchInitialiseReducer,
  credentials: setCredentialsREducer,
  patients: fetchPatientsReducer,
  userAccount: fetchUserAccountReducer,
});

export default rootReducer;
