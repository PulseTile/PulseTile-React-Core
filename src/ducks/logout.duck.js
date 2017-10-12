import _ from 'lodash/fp';
import { createAction } from 'redux-actions';

export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_FINISH = 'LOGOUT_FINISH';

export const logoutStart = createAction(LOGOUT_START);
export const logoutFinish = createAction(LOGOUT_FINISH);

//TODO this is cause /react-ui isn't root path and session cookie could be deleted only from /
const clearCookie = () => 'JSESSIONID=; expires=Thu, 01-Jan-70 00:00:01 GMT;';

export const logoutEpic = (action$, store) =>
  action$.ofType(LOGOUT_START)
    .map(() => {
      clearCookie();
      window.location = ''; // TO REFRESH THE PAGE
      return logoutFinish()
    });
