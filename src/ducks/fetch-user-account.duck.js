import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../config/server-urls.constants';

export const FETCH_USER_ACCOUNT_REQUEST = 'FETCH_USER_ACCOUNT_REQUEST';
export const FETCH_USER_ACCOUNT_SUCCESS = 'FETCH_USER_ACCOUNT_SUCCESS';
export const FETCH_USER_ACCOUNT_FAILURE = 'FETCH_USER_ACCOUNT_FAILURE';

export const fetchUserAccountRequest = createAction(FETCH_USER_ACCOUNT_REQUEST);
export const fetchUserAccountSuccess = createAction(FETCH_USER_ACCOUNT_SUCCESS);
export const fetchUserAccountFailure = createAction(FETCH_USER_ACCOUNT_FAILURE);

export const fetchUserAccountEpic = (action$, store) =>
  action$.ofType(FETCH_USER_ACCOUNT_REQUEST)
    .mergeMap(() =>
      ajax.getJSON(usersUrls.USER_ACCOUNT_URL, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(fetchUserAccountSuccess)
    );

export default function reducer(userAccount = {}, action) {
  switch (action.type) {
    case FETCH_USER_ACCOUNT_SUCCESS:
      return action.payload;
    default:
      return userAccount;
  }
}
