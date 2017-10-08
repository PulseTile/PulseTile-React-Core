import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { createAction } from 'redux-actions';

export const REDIRECT_TO_LOGIN = 'REDIRECT_TO_LOGIN';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const redirectToLogin = createAction(REDIRECT_TO_LOGIN);
export const loginPending = createAction(LOGIN_PENDING);
export const loginFailure = createAction(LOGIN_FAILURE);

//TODO should be refactored to actual sequence, not parallel listening
export const loginEpic = (action$, store) =>
  action$.ofType(REDIRECT_TO_LOGIN)
    .map((action) => {
      const { config, connections } = action.payload;

      let auth0;
      if (!auth0) auth0 = new Auth0(config); //from CDN

      auth0.login({ connections }); //will redirect
      return loginPending(action);
    })
    .catch(error => Observable.of(loginFailure(error)));

export default function reducer(loginStatus = {}, action) {
  switch (action.type) {
    case LOGIN_PENDING:
    default:
      return loginStatus
  }
}
