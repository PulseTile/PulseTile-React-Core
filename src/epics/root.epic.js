import { combineEpics } from 'redux-observable';

import fetchAllUsersEpic from './fetch-all-users.epic';

const rootEpic = combineEpics(
  fetchAllUsersEpic
);

export default rootEpic;
