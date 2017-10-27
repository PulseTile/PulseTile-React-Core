import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_PATIENT_DIAGNOSES_REQUEST = 'FETCH_PATIENT_DIAGNOSES_REQUEST';
export const FETCH_PATIENT_DIAGNOSES_SUCCESS = 'FETCH_PATIENT_DIAGNOSES_SUCCESS';
export const FETCH_PATIENT_DIAGNOSES_FAILURE = 'FETCH_PATIENT_DIAGNOSES_FAILURE';

export const fetchPatientDiagnosesRequest = createAction(FETCH_PATIENT_DIAGNOSES_REQUEST);
export const fetchPatientDiagnosesSuccess = createAction(FETCH_PATIENT_DIAGNOSES_SUCCESS);
export const fetchPatientDiagnosesFailure = createAction(FETCH_PATIENT_DIAGNOSES_FAILURE);

export const fetchPatientDiagnosesEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_DIAGNOSES_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/problems`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientDiagnosesSuccess({
          userId: payload.userId,
          diagnoses: response,
        }))
        .catch(error => Observable.of(fetchPatientDiagnosesFailure(error)))
    );

export default function reducer(patientsDiagnoses = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_DIAGNOSES_SUCCESS:
      return _.set(action.payload.userId, action.payload.diagnoses, patientsDiagnoses);
    default:
      return patientsDiagnoses;
  }
}
