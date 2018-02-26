import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../config/server-urls.constants'

export const FETCH_ADVANCED_PATIENT_SEARCH_REQUEST = 'FETCH_ADVANCED_PATIENT_SEARCH_REQUEST';
export const FETCH_ADVANCED_PATIENT_SEARCH_SUCCESS = 'FETCH_ADVANCED_PATIENT_SEARCH_SUCCESS';
export const FETCH_ADVANCED_PATIENT_SEARCH_FAILURE = 'FETCH_ADVANCED_PATIENT_SEARCH_FAILURE';

export const fetchAdvancedPatientSearchRequest = createAction(FETCH_ADVANCED_PATIENT_SEARCH_REQUEST);
export const fetchAdvancedPatientSearchSuccess = createAction(FETCH_ADVANCED_PATIENT_SEARCH_SUCCESS);
export const fetchAdvancedPatientSearchFailure = createAction(FETCH_ADVANCED_PATIENT_SEARCH_FAILURE);

export const fetchAdvancedPatientSearchEpic = (action$, store) =>
  action$.ofType(FETCH_ADVANCED_PATIENT_SEARCH_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.post(usersUrls.ADVANCED_PATIENT_SEARCH, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .map(({ response }) => fetchAdvancedPatientSearchSuccess(response))
        // .catch(error => Observable.of(fetchAdvancedPatientSearchFailure(error)))
    );

export default function reducer(advancedSearchPatient = {}, action) {
  switch (action.type) {
    case FETCH_ADVANCED_PATIENT_SEARCH_SUCCESS:
      return action.payload;
    default:
      return advancedSearchPatient
  }
}
