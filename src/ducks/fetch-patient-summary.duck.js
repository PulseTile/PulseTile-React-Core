import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../config/server-urls.constants';

export const FETCH_PATIENT_SUMMARY_REQUEST = 'FETCH_PATIENT_SUMMARY_REQUEST';
export const FETCH_PATIENT_SUMMARY_SUCCESS = 'FETCH_PATIENT_SUMMARY_SUCCESS';
export const FETCH_PATIENT_SUMMARY_FAILURE = 'FETCH_PATIENT_SUMMARY_FAILURE';

export const fetchPatientSummaryRequest = createAction(FETCH_PATIENT_SUMMARY_REQUEST);
export const fetchPatientSummarySuccess = createAction(FETCH_PATIENT_SUMMARY_SUCCESS);
export const fetchPatientSummaryFailure = createAction(FETCH_PATIENT_SUMMARY_FAILURE);

export const fetchPatientSummaryEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_SUMMARY_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientSummarySuccess({
          userId: payload.userId,
          summary: response,
        }))
        .catch(error => Observable.of(fetchPatientSummaryFailure(error)))
    );

export default function reducer(patientsSummaries = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_SUMMARY_SUCCESS:
      return _.set(action.payload.userId, action.payload.summary, patientsSummaries);
    default:
      return patientsSummaries;
  }
}
