import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientDiagnosesUpdateRequest } from './fetch-patient-diagnoses.duck'
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_PATIENT_DIAGNOSES_DETAIL_EDIT_REQUEST = 'FETCH_PATIENT_DIAGNOSES_DETAIL_EDIT_REQUEST';
export const FETCH_PATIENT_DIAGNOSES_DETAIL_EDIT_SUCCESS = 'FETCH_PATIENT_DIAGNOSES_DETAIL_EDIT_SUCCESS';
export const FETCH_PATIENT_DIAGNOSES_DETAIL_EDIT_FAILURE = 'FETCH_PATIENT_DIAGNOSES_DETAIL_EDIT_FAILURE';

export const fetchPatientDiagnosesDetailEditRequest = createAction(FETCH_PATIENT_DIAGNOSES_DETAIL_EDIT_REQUEST);
export const fetchPatientDiagnosesDetailEditSuccess = createAction(FETCH_PATIENT_DIAGNOSES_DETAIL_EDIT_SUCCESS);
export const fetchPatientDiagnosesDetailEditFailure = createAction(FETCH_PATIENT_DIAGNOSES_DETAIL_EDIT_FAILURE);

export const fetchPatientDiagnosesDetailEditEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_DIAGNOSES_DETAIL_EDIT_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.put(`${usersUrls.PATIENTS_URL}/${payload.userId}/problems/${payload.sourceId}`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;

          return [
            fetchPatientDiagnosesDetailEditSuccess(response),
            fetchPatientDiagnosesUpdateRequest({ userId, sourceId }),
          ];
        })
        // .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(diagnosesDetailEdit = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_DIAGNOSES_DETAIL_EDIT_SUCCESS:
      return action.payload;
    default:
      return diagnosesDetailEdit;
  }
}