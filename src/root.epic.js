import { combineEpics } from 'redux-observable';

import { initialiseEpic } from './ducks/initialise-app.duck'
import { loginEpic } from './ducks/login-status.duck';
import { logoutEpic } from './ducks/logout.duck';
import { fetchInitialiseEpic } from './ducks/fetch-initialise.duck';
import { setCredentialsEpic } from './ducks/set-credentials.duck';
import { fetchPatientsEpic } from './ducks/feth-patients.duck';
import { fetchPatientCountsEpic } from './ducks/fetch-patient-counts.duck';
import { fetchUserAccountEpic } from './ducks/fetch-user-account.duck';
import { fetchBasicPatientSearchEpic } from './ducks/fetch-basic-patient-search.duck';
import { fetchAdvancedPatientSearchEpic } from './ducks/fetch-advanced-patient-search.duck';
import { fetchPatientSummaryEpic } from './ducks/fetch-patient-summary.duck';
import { fetchProfileAppPreferencesEpic } from './ducks/fetch-profile-application-preferences.duck';
import { fetchPatientAllergiesEpic } from './ducks/fetch-patient-allergies.duck';
import { fetchPatientAllergiesCreateEpic } from './ducks/fetch-patient-allergies-create.duck';
import { fetchPatientsInfoEpic } from './ducks/fetch-patients-info.duck';
import { setThemeEpic } from './ducks/set-theme.duck';
import { fetchPatientAllergiesDetailEpic } from './ducks/fetch-patient-allergies-detail.duck';
import { fetchPatientAllergiesDetailEditEpic } from './ducks/fetch-patient-allergies-detail-edit.duck';

const rootEpic = combineEpics(
  initialiseEpic,
  loginEpic,
  logoutEpic,
  fetchInitialiseEpic,
  setCredentialsEpic,
  fetchPatientsEpic,
  fetchPatientCountsEpic,
  fetchUserAccountEpic,
  fetchBasicPatientSearchEpic,
  fetchAdvancedPatientSearchEpic,
  fetchPatientSummaryEpic,
  fetchProfileAppPreferencesEpic,
  fetchPatientAllergiesEpic,
  fetchPatientsInfoEpic,
  setThemeEpic,
  fetchPatientAllergiesCreateEpic,
  fetchPatientAllergiesDetailEpic,
  fetchPatientAllergiesDetailEditEpic,
);

export default rootEpic;
