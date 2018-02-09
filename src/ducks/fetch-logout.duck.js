import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { apiUrls } from '../config/server-urls.constants';
import { handleErrors } from './handle-errors.duck';

export const FETCH_LOGOUT_REQUEST = 'FETCH_LOGOUT_REQUEST';
export const FETCH_LOGOUT_SUCCESS = 'FETCH_LOGOUT_SUCCESS';
export const FETCH_LOGOUT_FAILURE = 'FETCH_LOGOUT_FAILURE';

export const fetchLogoutRequest = createAction(FETCH_LOGOUT_REQUEST);
export const fetchLogoutSuccess = createAction(FETCH_LOGOUT_SUCCESS);
export const fetchLogoutFailure = createAction(FETCH_LOGOUT_FAILURE);

export const fetchLogoutEpic = action$ =>
  action$.ofType(FETCH_LOGOUT_REQUEST)
    .mergeMap(() =>
      ajax.getJSON(apiUrls.LOGOUT)
        .map(fetchLogoutSuccess)
        .catch((error) => {
          return Observable.of(handleErrors(error))
        })
    );
