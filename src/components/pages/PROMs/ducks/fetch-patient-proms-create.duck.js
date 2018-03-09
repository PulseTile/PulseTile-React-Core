import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientPromsRequest } from './fetch-patient-proms.duck'

export const FETCH_PATIENT_PROMS_CREATE_REQUEST = 'FETCH_PATIENT_PROMS_CREATE_REQUEST';
export const FETCH_PATIENT_PROMS_CREATE_SUCCESS = 'FETCH_PATIENT_PROMS_CREATE_SUCCESS';
export const FETCH_PATIENT_PROMS_CREATE_FAILURE = 'FETCH_PATIENT_PROMS_CREATE_FAILURE';

export const fetchPatientPromsCreateRequest = createAction(FETCH_PATIENT_PROMS_CREATE_REQUEST);
export const fetchPatientPromsCreateSuccess = createAction(FETCH_PATIENT_PROMS_CREATE_SUCCESS);
export const fetchPatientPromsCreateFailure = createAction(FETCH_PATIENT_PROMS_CREATE_FAILURE);

export const fetchPatientPromsCreateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_PROMS_CREATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.post(`${usersUrls.PATIENTS_URL}/${payload.userId}/proms`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;

          return [
            fetchPatientPromsCreateSuccess(response),
            fetchPatientPromsRequest({ userId }),
          ];
        })
    );

export default function reducer(patientPromsCreate = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_PROMS_CREATE_SUCCESS:
      return action.payload;
    default:
      return patientPromsCreate
  }
}
