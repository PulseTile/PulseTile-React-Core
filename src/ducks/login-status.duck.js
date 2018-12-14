import { Observable } from 'rxjs';
import { createAction } from 'redux-actions';

export const REDIRECT_TO_LOGIN_URL = 'REDIRECT_TO_LOGIN_URL';
export const REDIRECT_TO_LOGIN = 'REDIRECT_TO_LOGIN';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const redirectToLoginUrl = createAction(REDIRECT_TO_LOGIN_URL);
export const loginPending = createAction(LOGIN_PENDING);
export const loginFailure = createAction(LOGIN_FAILURE);

export const loginURLEpic = (action$, store) =>
  action$.ofType(REDIRECT_TO_LOGIN_URL)
    .map((action) => {
      const { redirectURL } = action.payload;
      console.log('location.replace(redirectURL)');
      window.location.replace(redirectURL);
    })
    .catch(error => Observable.of(loginFailure(error)))

export default function reducer(loginStatus = {}, action) {
  switch (action.type) {
    case LOGIN_PENDING:
    default:
      return loginStatus;
  }
}
