import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientAllergiesRequest } from './fetch-patient-allergies.duck'

export const FETCH_PATIENT_ALLERGIES_CREATE_REQUEST = 'FETCH_PATIENT_ALLERGIES_CREATE_REQUEST';
export const FETCH_PATIENT_ALLERGIES_CREATE_SUCCESS = 'FETCH_PATIENT_ALLERGIES_CREATE_SUCCESS';
export const FETCH_PATIENT_ALLERGIES_CREATE_FAILURE = 'FETCH_PATIENT_ALLERGIES_CREATE_FAILURE';

export const fetchPatientAllergiesCreateRequest = createAction(FETCH_PATIENT_ALLERGIES_CREATE_REQUEST);
export const fetchPatientAllergiesCreateSuccess = createAction(FETCH_PATIENT_ALLERGIES_CREATE_SUCCESS);
export const fetchPatientAllergiesCreateFailure = createAction(FETCH_PATIENT_ALLERGIES_CREATE_FAILURE);

export const fetchPatientAllergiesCreateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_ALLERGIES_CREATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.post(`${usersUrls.PATIENTS_URL}/${payload.userId}/allergies`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;

          return [
            fetchPatientAllergiesCreateSuccess(response),
            fetchPatientAllergiesRequest({ userId })
          ];
        })
        .catch(error => Observable.of(fetchPatientAllergiesCreateFailure(error)))
    );

export default function reducer(patientAllergiesCreate = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_ALLERGIES_CREATE_SUCCESS:
      return action.payload;
    default:
      return patientAllergiesCreate
  }
}
