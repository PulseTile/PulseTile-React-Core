import { combineEpics } from 'redux-observable';

import { initialiseEpic } from '../ducks/initialise-app.duck'
import { fetchInitialiseEpic } from '../ducks/fetch-initialise.duck';
import { setCredentialsEpic } from '../ducks/set-credentials.duck';
import { fetchPatientsEpic } from '../ducks/feth-patients.duck';
import { fetchUserAccountEpic } from '../ducks/fetch-user-account.duck';

const rootEpic = combineEpics(
  initialiseEpic,
  fetchInitialiseEpic,
  setCredentialsEpic,
  fetchPatientsEpic,
  fetchUserAccountEpic
);

export default rootEpic;
