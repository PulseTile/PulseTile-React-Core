import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../config/server-urls.constants'
import {handleErrors} from "./handle-errors.duck";

export const FETCH_PATIENTS_INFO_REQUEST = 'FETCH_PATIENTS_INFO_REQUEST';
export const FETCH_PATIENTS_INFO_SUCCESS = 'FETCH_PATIENTS_INFO_SUCCESS';
export const FETCH_PATIENTS_INFO_FAILURE = 'FETCH_PATIENT_SUMMARY_FAILURE';

export const fetchPatientsInfoRequest = createAction(FETCH_PATIENTS_INFO_REQUEST);
export const fetchPatientsInfoSuccess = createAction(FETCH_PATIENTS_INFO_SUCCESS);
export const fetchPatientsInfoFailure = createAction(FETCH_PATIENTS_INFO_FAILURE);

export const fetchPatientsInfoEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENTS_INFO_REQUEST)
    .mergeMap(() =>
      ajax.getJSON(usersUrls.PROFILE_APP_PREFERENCES, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(fetchPatientsInfoSuccess)
        .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(patientsInfo = {}, action) {
  switch (action.type) {
    case FETCH_PATIENTS_INFO_SUCCESS:
      return action.payload;
    default:
      return patientsInfo
  }
}
