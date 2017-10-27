import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_PATIENT_DIAGNOSES_DETAIL_EDIT_REQUEST = 'FETCH_PATIENT_DIAGNOSES_DETAIL_EDIT_REQUEST';
export const FETCH_PATIENT_DIAGNOSES_DETAIL_EDIT_SUCCESS = 'FETCH_PATIENT_DIAGNOSES_DETAIL_EDIT_SUCCESS';
export const FETCH_PATIENT_DIAGNOSES_DETAIL_EDIT_FAILURE = 'FETCH_PATIENT_DIAGNOSES_DETAIL_EDIT_FAILURE';

export const fetchPatientDiagnosesDetailEditRequest = createAction(FETCH_PATIENT_DIAGNOSES_DETAIL_EDIT_REQUEST);
export const fetchPatientDiagnosesDetailEditSuccess = createAction(FETCH_PATIENT_DIAGNOSES_DETAIL_EDIT_SUCCESS);
export const fetchPatientDiagnosesDetailEditFailure = createAction(FETCH_PATIENT_DIAGNOSES_DETAIL_EDIT_FAILURE);

export const fetchPatientDiagnosesDetailEditEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_DIAGNOSES_DETAIL_EDIT_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.put(`${usersUrls.PATIENTS_URL}/${payload.userId}/problems`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .map(({ response }) => fetchPatientDiagnosesDetailEditSuccess(response))
        .catch(error => Observable.of(fetchPatientDiagnosesDetailEditFailure(error)))
    );

export default function reducer(diagnosesDetailEdit = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_DIAGNOSES_DETAIL_EDIT_SUCCESS:
      return action.payload;
    default:
      return diagnosesDetailEdit;
  }
}