import { Observable } from 'rxjs';
import { createAction } from 'redux-actions';
import {handleErrors} from "./handle-errors.duck";

export const SET_CREDENTIALS_START = 'SET_CREDENTIALS_START';
export const SET_CREDENTIALS_SUCCESS = 'SET_CREDENTIALS_SUCCESS';
export const SET_CREDENTIALS_FAILURE = 'SET_CREDENTIALS_FAILURE';

export const setCredentialsStart = createAction(SET_CREDENTIALS_START);
export const setCredentialsSuccess = createAction(SET_CREDENTIALS_SUCCESS);
export const setCredentialsFailure = createAction(SET_CREDENTIALS_FAILURE);

export const setCredentialsEpic = (action$, store) =>
  action$.ofType(SET_CREDENTIALS_START)
    .map(action => setCredentialsSuccess(action.payload))
    .catch(error => Observable.of(handleErrors(error)))

export default function reducer(credentials = {}, action) {
  switch (action.type) {
    case SET_CREDENTIALS_SUCCESS:
      return action.payload;
    default:
      return credentials
  }
}
