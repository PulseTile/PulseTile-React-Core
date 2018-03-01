import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';

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
import { fetchGetRssFeedsEpic } from './ducks/fetch-get-rss-feeds.duck';

import { handleErrors } from './ducks/handle-errors.duck';

const wrapEpic = epic => (...args) =>
  epic(...args)
    .map((params) => {
      // console.log(params);
      return params
    })
    .catch(error => Observable.of(handleErrors(error)));

const rootEpic = combineEpics(...[
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
  fetchGetRssFeedsEpic,
  ...pluginsEpicConfig,
].map(wrapEpic));

export default rootEpic;
