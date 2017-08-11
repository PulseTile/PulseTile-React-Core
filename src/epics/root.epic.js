import { combineEpics } from 'redux-observable';

import fetchAllUsersEpic from './fetch-all-users.epic';
import { fetchUserAccountEpic } from '../ducks/fetch-user-account.duck';

const rootEpic = combineEpics(
  fetchAllUsersEpic,
  fetchUserAccountEpic
);

export default rootEpic;
