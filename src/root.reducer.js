import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import fetchInitialiseReducer from './ducks/fetch-initialise.duck'
import loginStatusReducer from './ducks/login-status.duck'
import setCredentialsREducer from './ducks/set-credentials.duck'
import fetchPatientsReducer from './ducks/feth-patients.duck'
import fetchPatientCountsReducer from './ducks/fetch-patient-counts.duck'
import fetchUserAccountReducer from './ducks/fetch-user-account.duck'
import fetchBasicPatientSearchReducer from './ducks/fetch-basic-patient-search.duck'
import fetchAdvancedPatientSearchReducer from './ducks/fetch-advanced-patient-search.duck'
import fetchPatientSummaryReducer from './ducks/fetch-patient-summary.duck'
import fetchProfileAppPreferencesReducer from './ducks/fetch-profile-application-preferences.duck'
import setSidebarVisibilityReducer from './ducks/set-sidebar-visibility'
import fetchPatientAllergiesReducer from './ducks/fetch-patient-allergies.duck'
import fetchPatientsInfoReducer from './ducks/fetch-patients-info.duck'

const rootReducer = combineReducers({
  router: routerReducer,
  form: formReducer,
  initialiseData: fetchInitialiseReducer,
  loginStatus: loginStatusReducer,
  credentials: setCredentialsREducer,
  patients: fetchPatientsReducer,
  patientsCounts: fetchPatientCountsReducer,
  userAccount: fetchUserAccountReducer,
  basicSearchPatient: fetchBasicPatientSearchReducer,
  advancedSearchPatient: fetchAdvancedPatientSearchReducer,
  patientsSummaries: fetchPatientSummaryReducer,
  isSidebarVisible: setSidebarVisibilityReducer,
  profileAppPreferences: fetchProfileAppPreferencesReducer,
  patientsAllergies: fetchPatientAllergiesReducer,
  patientsInfo: fetchPatientsInfoReducer,
});

export default rootReducer;
