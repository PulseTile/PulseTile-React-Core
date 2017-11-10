import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_PATIENT_PROCEDURES_CREATE_REQUEST = 'FETCH_PATIENT_PROCEDURES_CREATE_REQUEST';
export const FETCH_PATIENT_PROCEDURES_CREATE_SUCCESS = 'FETCH_PATIENT_PROCEDURES_CREATE_SUCCESS';
export const FETCH_PATIENT_PROCEDURES_CREATE_FAILURE = 'FETCH_PATIENT_PROCEDURES_CREATE_FAILURE';

export const fetchPatientProceduresCreateRequest = createAction(FETCH_PATIENT_PROCEDURES_CREATE_REQUEST);
export const fetchPatientProceduresCreateSuccess = createAction(FETCH_PATIENT_PROCEDURES_CREATE_SUCCESS);
export const fetchPatientProceduresCreateFailure = createAction(FETCH_PATIENT_PROCEDURES_CREATE_FAILURE);

export const fetchPatientProceduresCreateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_PROCEDURES_CREATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.post(`${usersUrls.PATIENTS_URL}/${payload.userId}/procedures`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .map(({ response }) => fetchPatientProceduresCreateSuccess(response))
        .catch(error => Observable.of(fetchPatientProceduresCreateFailure(error)))
    );

export default function reducer(patientProceduresCreate = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_PROCEDURES_CREATE_SUCCESS:
      return action.payload;
    default:
      return patientProceduresCreate
  }
}
