import { createAction } from 'redux-actions';
import { Observable } from 'rxjs/Rx';

import { fetchLogoutRequest, FETCH_LOGOUT_SUCCESS } from './fetch-logout.duck';

export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_FINISH = 'LOGOUT_FINISH';

export const logoutStart = createAction(LOGOUT_START);
export const logoutFinish = createAction(LOGOUT_FINISH);

//TODO this is cause /react-ui isn't root path and session cookie could be deleted only from /
const clearCookie = () => document.cookie = 'JSESSIONID=; expires=Thu, 01-Jan-70 00:00:01 GMT;';

export const logoutEpic = (action$, store) => Observable.merge(
  action$.ofType(LOGOUT_START)
    .map(() => {
      return fetchLogoutRequest();
    }),
  action$.ofType(FETCH_LOGOUT_SUCCESS)
    .map(() => {
      clearCookie();
      window.location = ''; // TO REFRESH THE PAGE
      return logoutFinish();
    })
);

