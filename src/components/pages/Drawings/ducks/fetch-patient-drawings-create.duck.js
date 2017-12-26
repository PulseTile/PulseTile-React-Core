import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientDrawingsRequest } from './fetch-patient-drawings.duck'

export const FETCH_PATIENT_DRAWINGS_CREATE_REQUEST = 'FETCH_PATIENT_DRAWINGS_CREATE_REQUEST';
export const FETCH_PATIENT_DRAWINGS_CREATE_SUCCESS = 'FETCH_PATIENT_DRAWINGS_CREATE_SUCCESS';
export const FETCH_PATIENT_DRAWINGS_CREATE_FAILURE = 'FETCH_PATIENT_DRAWINGS_CREATE_FAILURE';

export const fetchPatientDrawingsCreateRequest = createAction(FETCH_PATIENT_DRAWINGS_CREATE_REQUEST);
export const fetchPatientDrawingsCreateSuccess = createAction(FETCH_PATIENT_DRAWINGS_CREATE_SUCCESS);
export const fetchPatientDrawingsCreateFailure = createAction(FETCH_PATIENT_DRAWINGS_CREATE_FAILURE);

export const fetchPatientDrawingsCreateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_DRAWINGS_CREATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.post(`${usersUrls.PICTURES}/${payload.userId}`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;

          return [
            fetchPatientDrawingsCreateSuccess(response),
            fetchPatientDrawingsRequest({ userId }),
          ];
        })
        .catch(error => Observable.of(fetchPatientDrawingsCreateFailure(error)))
    );

export default function reducer(patientDrawingsCreate = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_DRAWINGS_CREATE_SUCCESS:
      return action.payload;
    default:
      return patientDrawingsCreate
  }
}
