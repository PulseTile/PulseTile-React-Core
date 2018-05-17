import _ from 'lodash/fp';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_PATIENT_TEST_RESULTS_DETAIL_REQUEST = 'FETCH_PATIENT_TEST_RESULTS_DETAIL_REQUEST';
export const FETCH_PATIENT_TEST_RESULTS_DETAIL_SUCCESS = 'FETCH_PATIENT_TEST_RESULTS_DETAIL_SUCCESS';
export const FETCH_PATIENT_TEST_RESULTS_DETAIL_FAILURE = 'FETCH_PATIENT_TEST_RESULTS_DETAIL_FAILURE';

export const fetchPatientTestResultsDetailRequest = createAction(FETCH_PATIENT_TEST_RESULTS_DETAIL_REQUEST);
export const fetchPatientTestResultsDetailSuccess = createAction(FETCH_PATIENT_TEST_RESULTS_DETAIL_SUCCESS);
export const fetchPatientTestResultsDetailFailure = createAction(FETCH_PATIENT_TEST_RESULTS_DETAIL_FAILURE);

export const fetchPatientTestResultsDetailEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_TEST_RESULTS_DETAIL_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/labresults/${payload.sourceId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientTestResultsDetailSuccess({
          userId: payload.userId,
          testResultsDetail: response,
          token: response.token,
        }))
    );

export default function reducer(testResultsDetail = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_TEST_RESULTS_DETAIL_SUCCESS:
      return _.set(action.payload.userId, action.payload.testResultsDetail, testResultsDetail);
    default:
      return testResultsDetail;
  }
}