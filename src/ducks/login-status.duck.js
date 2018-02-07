import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { createAction } from 'redux-actions';
import {handleErrors} from "./handle-errors.duck";

export const REDIRECT_TO_LOGIN_URL = 'REDIRECT_TO_LOGIN_URL';
export const REDIRECT_TO_LOGIN = 'REDIRECT_TO_LOGIN';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const redirectToLoginUrl = createAction(REDIRECT_TO_LOGIN_URL);
export const redirectToLogin = createAction(REDIRECT_TO_LOGIN);
export const loginPending = createAction(LOGIN_PENDING);
export const loginFailure = createAction(LOGIN_FAILURE);

export const loginEpic = (action$, store) =>
  action$.ofType(REDIRECT_TO_LOGIN)
    .map((action) => {
      const { config, connections } = action.payload;

      let auth0;
      if (!auth0) auth0 = new Auth0(config); //from CDN

      auth0.login({ connections }); //will redirect
      return loginPending(action);
    })
    .catch(error => Observable.of(handleErrors(error)))

export const loginURLEpic = (action$, store) =>
  action$.ofType(REDIRECT_TO_LOGIN_URL)
    .map((action) => {
      const { redirectURL } = action.payload;
      console.log('location.replace(redirectURL)');
      window.location.replace(redirectURL);
    })
    .catch(error => Observable.of(handleErrors(error)))

export default function reducer(loginStatus = {}, action) {
  switch (action.type) {
    case LOGIN_PENDING:
    default:
      return loginStatus
  }
}
