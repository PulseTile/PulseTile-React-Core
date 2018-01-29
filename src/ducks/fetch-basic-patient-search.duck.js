import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../config/server-urls.constants'
import {handleErrors} from "./handle-errors.duck";

export const FETCH_BASIC_PATIENT_SEARCH_REQUEST = 'FETCH_BASIC_PATIENT_SEARCH_REQUEST';
export const FETCH_BASIC_PATIENT_SEARCH_SUCCESS = 'FETCH_BASIC_PATIENT_SEARCH_SUCCESS';
export const FETCH_BASIC_PATIENT_SEARCH_FAILURE = 'FETCH_BASIC_PATIENT_SEARCH_FAILURE';

export const fetchBasicPatientSearchRequest = createAction(FETCH_BASIC_PATIENT_SEARCH_REQUEST);
export const fetchBasicPatientSearchSuccess = createAction(FETCH_BASIC_PATIENT_SEARCH_SUCCESS);
export const fetchBasicPatientSearchFailure = createAction(FETCH_BASIC_PATIENT_SEARCH_FAILURE);

export const fetchBasicPatientSearchEpic = (action$, store) =>
  action$.ofType(FETCH_BASIC_PATIENT_SEARCH_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.post(usersUrls.BASIC_PATIENT_SEARCH, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .map(({ response }) => fetchBasicPatientSearchSuccess(response))
        .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(basicSearchPatient = {}, action) {
  switch (action.type) {
    case FETCH_BASIC_PATIENT_SEARCH_SUCCESS:
      return action.payload;
    default:
      return basicSearchPatient
  }
}
