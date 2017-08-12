import { combineEpics } from 'redux-observable';

import { fetchInitialiseEpic } from '../ducks/fetch-initialise.duck';
import { setCredentialsEpic } from '../ducks/set-credentials.duck';
import { fetchPatientsEpic } from '../ducks/feth-patients.duck';
import { fetchUserAccountEpic } from '../ducks/fetch-user-account.duck';

const rootEpic = combineEpics(
  fetchInitialiseEpic,
  setCredentialsEpic,
  fetchPatientsEpic,
  fetchUserAccountEpic
);

export default rootEpic;
