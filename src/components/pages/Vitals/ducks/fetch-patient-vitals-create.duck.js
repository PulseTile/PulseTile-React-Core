import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientVitalsRequest } from './fetch-patient-vitals.duck'

export const FETCH_PATIENT_VITALS_CREATE_REQUEST = 'FETCH_PATIENT_VITALS_CREATE_REQUEST';
export const FETCH_PATIENT_VITALS_CREATE_SUCCESS = 'FETCH_PATIENT_VITALS_CREATE_SUCCESS';
export const FETCH_PATIENT_VITALS_CREATE_FAILURE = 'FETCH_PATIENT_VITALS_CREATE_FAILURE';

export const fetchPatientVitalsCreateRequest = createAction(FETCH_PATIENT_VITALS_CREATE_REQUEST);
export const fetchPatientVitalsCreateSuccess = createAction(FETCH_PATIENT_VITALS_CREATE_SUCCESS);
export const fetchPatientVitalsCreateFailure = createAction(FETCH_PATIENT_VITALS_CREATE_FAILURE);

export const fetchPatientVitalsCreateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_VITALS_CREATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.post(`${usersUrls.PATIENTS_URL}/${payload.userId}/vitalsigns`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;

          return [
            fetchPatientVitalsCreateSuccess(response),
            fetchPatientVitalsRequest({ userId }),
          ];
        })
    );

export default function reducer(patientVitalsCreate = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_VITALS_CREATE_SUCCESS:
      return action.payload;
    default:
      return patientVitalsCreate
  }
}
