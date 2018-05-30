import _ from 'lodash/fp';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_PATIENT_DIAGNOSES_DETAIL_REQUEST = 'FETCH_PATIENT_DIAGNOSES_DETAIL_REQUEST';
export const FETCH_PATIENT_DIAGNOSES_DETAIL_SUCCESS = 'FETCH_PATIENT_DIAGNOSES_DETAIL_SUCCESS';
export const FETCH_PATIENT_DIAGNOSES_DETAIL_FAILURE = 'FETCH_PATIENT_DIAGNOSES_DETAIL_FAILURE';

export const fetchPatientDiagnosesDetailRequest = createAction(FETCH_PATIENT_DIAGNOSES_DETAIL_REQUEST);
export const fetchPatientDiagnosesDetailSuccess = createAction(FETCH_PATIENT_DIAGNOSES_DETAIL_SUCCESS);
export const fetchPatientDiagnosesDetailFailure = createAction(FETCH_PATIENT_DIAGNOSES_DETAIL_FAILURE);

export const fetchPatientDiagnosesDetailEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_DIAGNOSES_DETAIL_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/problems/${payload.sourceId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientDiagnosesDetailSuccess({
          userId: payload.userId,
          diagnosesDetail: response,
          token: response.token,
        }))
    );

export default function reducer(diagnosesDetail = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_DIAGNOSES_DETAIL_SUCCESS:
      return _.set(action.payload.userId, action.payload.diagnosesDetail, diagnosesDetail);
    default:
      return diagnosesDetail;
  }
}