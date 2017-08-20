import { combineReducers } from 'redux';

import fetchInitialiseReducer from '../ducks/fetch-initialise.duck'
import setCredentialsREducer from '../ducks/set-credentials.duck'
import fetchPatientsReducer from '../ducks/feth-patients.duck'
import fetchPatientCountsReducer from '../ducks/fetch-patient-counts.duck'
import fetchUserAccountReducer from '../ducks/fetch-user-account.duck'

const rootReducer = combineReducers({
  initialiseData: fetchInitialiseReducer,
  credentials: setCredentialsREducer,
  patients: fetchPatientsReducer,
  patientsCounts: fetchPatientCountsReducer,
  userAccount: fetchUserAccountReducer,
});

export default rootReducer;
