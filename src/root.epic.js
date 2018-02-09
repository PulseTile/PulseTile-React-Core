import { combineEpics } from 'redux-observable';

import { pluginsEpicConfig } from './plugins.config';
import { initialiseEpic } from './ducks/initialise-app.duck';
import { loginEpic, loginURLEpic } from './ducks/login-status.duck';
import { logoutEpic } from './ducks/logout.duck';
import { fetchLogoutEpic } from './ducks/fetch-logout.duck';
import { fetchInitialiseEpic } from './ducks/fetch-initialise.duck';
import { setCredentialsEpic } from './ducks/set-credentials.duck';
import { fetchPatientsEpic } from './ducks/feth-patients.duck';
import { fetchPatientCountsEpic } from './ducks/fetch-patient-counts.duck';
import { fetchUserAccountEpic } from './ducks/fetch-user-account.duck';
import { fetchBasicPatientSearchEpic } from './ducks/fetch-basic-patient-search.duck';
import { fetchAdvancedPatientSearchEpic } from './ducks/fetch-advanced-patient-search.duck';
import { fetchClinicalQuerySearchEpic } from './ducks/fetch-clinical-query-search.duck';
import { fetchPatientSummaryEpic } from './ducks/fetch-patient-summary.duck';
import { fetchProfileAppPreferencesEpic } from './ducks/fetch-profile-application-preferences.duck';
import { fetchPatientsInfoEpic } from './ducks/fetch-patients-info.duck';
import { setThemeEpic } from './ducks/set-theme.duck';
import { setLogoEpic } from './ducks/set-logo.duck';
import { setTitleEpic } from './ducks/set-title.duck';

const rootEpic = combineEpics(
  initialiseEpic,
  loginEpic,
  loginURLEpic,
  logoutEpic,
  fetchLogoutEpic,
  fetchInitialiseEpic,
  setCredentialsEpic,
  fetchPatientsEpic,
  fetchPatientCountsEpic,
  fetchUserAccountEpic,
  fetchBasicPatientSearchEpic,
  fetchAdvancedPatientSearchEpic,
  fetchClinicalQuerySearchEpic,
  fetchPatientSummaryEpic,
  fetchProfileAppPreferencesEpic,
  fetchPatientsInfoEpic,
  setThemeEpic,
  setLogoEpic,
  setTitleEpic,
  ...pluginsEpicConfig,
);

export default rootEpic;
