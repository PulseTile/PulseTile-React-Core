import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../constants/server-urls.constants'

export const FETCH_USER_ACCOUNT_REQUEST = 'FETCH_USER_ACCOUNT_REQUEST';
export const FETCH_USER_ACCOUNT_SUCCESS = 'FETCH_USER_ACCOUNT_SUCCESS';
export const FETCH_USER_ACCOUNT_FAILURE = 'FETCH_USER_ACCOUNT_FAILURE';

export const fetchUserAccountRequest = createAction(FETCH_USER_ACCOUNT_REQUEST);
export const fetchUserAccountSuccess = createAction(FETCH_USER_ACCOUNT_SUCCESS);
export const fetchUserAccountFailure = createAction(FETCH_USER_ACCOUNT_FAILURE);

export const fetchUserAccountEpic = action$ =>
  action$.ofType(FETCH_USER_ACCOUNT_REQUEST)
    .mergeMap(() =>
      ajax.getJSON(usersUrls.USER_ACCOUNT_URL, {
        crossDomain: true,
        withCredentials: true,
        headers: {
          Cookie: 'JSESSIONID=3e0ba540-563b-4760-b671-6b40c1951507',
        },
      })
        .map(response => fetchUserAccountSuccess(response))
        .catch(error => Observable.of(fetchUserAccountFailure(error)))
    );

export default function reducer(userAccount = {}, action) {
  switch (action.type) {
    default:
      return userAccount;
  }
}
