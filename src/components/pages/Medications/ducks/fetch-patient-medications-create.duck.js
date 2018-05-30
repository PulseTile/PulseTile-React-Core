import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientMedicationsRequest } from './fetch-patient-medications.duck'

export const FETCH_PATIENT_MEDICATIONS_CREATE_REQUEST = 'FETCH_PATIENT_MEDICATIONS_CREATE_REQUEST';
export const FETCH_PATIENT_MEDICATIONS_CREATE_SUCCESS = 'FETCH_PATIENT_MEDICATIONS_CREATE_SUCCESS';
export const FETCH_PATIENT_MEDICATIONS_CREATE_FAILURE = 'FETCH_PATIENT_MEDICATIONS_CREATE_FAILURE';

export const fetchPatientMedicationsCreateRequest = createAction(FETCH_PATIENT_MEDICATIONS_CREATE_REQUEST);
export const fetchPatientMedicationsCreateSuccess = createAction(FETCH_PATIENT_MEDICATIONS_CREATE_SUCCESS);
export const fetchPatientMedicationsCreateFailure = createAction(FETCH_PATIENT_MEDICATIONS_CREATE_FAILURE);

export const fetchPatientMedicationsCreateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_MEDICATIONS_CREATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.post(`${usersUrls.PATIENTS_URL}/${payload.userId}/medications`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;

          return [
            fetchPatientMedicationsCreateSuccess(response),
            fetchPatientMedicationsRequest({ userId }),
          ];
        })
    );

export default function reducer(patientMedicationsCreate = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_MEDICATIONS_CREATE_SUCCESS:
      return action.payload;
    default:
      return patientMedicationsCreate
  }
}
