import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';
import { get } from 'lodash';

import { apiUrls } from '../config/server-urls.constants';
import { setCookieSessiionId } from '../utils/auth/cookie.utils';

export const FETCH_INITIALISE_REQUEST = 'FETCH_INITIALISE_REQUEST';
export const FETCH_INITIALISE_SUCCESS = 'FETCH_INITIALISE_SUCCESS';
export const FETCH_INITIALISE_FAILURE = 'FETCH_INITIALISE_FAILURE';
export const POLL_START = 'POLL_START';

export const fetchInitialiseRequest = createAction(FETCH_INITIALISE_REQUEST);
export const fetchInitialiseSuccess = createAction(FETCH_INITIALISE_SUCCESS);
export const fetchInitialiseFailure = createAction(FETCH_INITIALISE_FAILURE);
export const fetchPollStart = createAction(POLL_START);

export const fetchInitialiseEpic = action$ =>
  action$.ofType(FETCH_INITIALISE_REQUEST)
    .mergeMap(() =>
      ajax.getJSON(apiUrls.INITIALISE)
        .do(setCookieSessiionId)
          .map(response => {
            if ('loading_data' === get(response, 'status', null)) {
              return fetchPollStart(response);
            } else {
              return fetchInitialiseSuccess(response);
            }
          })
    );

export default function reducer(initialiseData = {}, action) {
  switch (action.type) {
    case FETCH_INITIALISE_SUCCESS:
      return action.payload;
    default:
      return initialiseData;
  }
}
