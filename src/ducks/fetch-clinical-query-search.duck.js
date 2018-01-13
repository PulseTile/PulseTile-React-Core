import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../config/server-urls.constants'

export const FETCH_CLINICAL_QUERY_SEARCH_REQUEST = 'FETCH_CLINICAL_QUERY_SEARCH_REQUEST';
export const FETCH_CLINICAL_QUERY_SEARCH_SUCCESS = 'FETCH_CLINICAL_QUERY_SEARCH_SUCCESS';
export const FETCH_CLINICAL_QUERY_SEARCH_FAILURE = 'FETCH_CLINICAL_QUERY_SEARCH_FAILURE';

export const fetchClinicalQuerySearchRequest = createAction(FETCH_CLINICAL_QUERY_SEARCH_REQUEST);
export const fetchClinicalQuerySearchSuccess = createAction(FETCH_CLINICAL_QUERY_SEARCH_SUCCESS);
export const fetchClinicalQuerySearchFailure = createAction(FETCH_CLINICAL_QUERY_SEARCH_FAILURE);

export const fetchClinicalQuerySearchEpic = (action$, store) =>
  action$.ofType(FETCH_CLINICAL_QUERY_SEARCH_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.post(usersUrls.CLINICAL_QUERY_SEARCH, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .map(({ response }) => fetchClinicalQuerySearchSuccess(response))
        .catch(error => Observable.of(fetchClinicalQuerySearchFailure(error)))
    );

export default function reducer(clinicalQuerySearch = {}, action) {
  switch (action.type) {
    case FETCH_CLINICAL_QUERY_SEARCH_SUCCESS:
      return action.payload;
    default:
      return clinicalQuerySearch
  }
}
