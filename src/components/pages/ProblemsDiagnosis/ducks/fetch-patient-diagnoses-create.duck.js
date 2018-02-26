import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientDiagnosesRequest } from './fetch-patient-diagnoses.duck'
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_PATIENT_DIAGNOSES_CREATE_REQUEST = 'FETCH_PATIENT_DIAGNOSES_CREATE_REQUEST';
export const FETCH_PATIENT_DIAGNOSES_CREATE_SUCCESS = 'FETCH_PATIENT_DIAGNOSES_CREATE_SUCCESS';
export const FETCH_PATIENT_DIAGNOSES_CREATE_FAILURE = 'FETCH_PATIENT_DIAGNOSES_CREATE_FAILURE';

export const fetchPatientDiagnosesCreateRequest = createAction(FETCH_PATIENT_DIAGNOSES_CREATE_REQUEST);
export const fetchPatientDiagnosesCreateSuccess = createAction(FETCH_PATIENT_DIAGNOSES_CREATE_SUCCESS);
export const fetchPatientDiagnosesCreateFailure = createAction(FETCH_PATIENT_DIAGNOSES_CREATE_FAILURE);

export const fetchPatientDiagnosesCreateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_DIAGNOSES_CREATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.post(`${usersUrls.PATIENTS_URL}/${payload.userId}/problems`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;

          return [
            fetchPatientDiagnosesCreateSuccess(response),
            fetchPatientDiagnosesRequest({ userId }),
          ];
        })
        // .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(patientDiagnosesCreate = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_DIAGNOSES_CREATE_SUCCESS:
      return action.payload;
    default:
      return patientDiagnosesCreate
  }
}
