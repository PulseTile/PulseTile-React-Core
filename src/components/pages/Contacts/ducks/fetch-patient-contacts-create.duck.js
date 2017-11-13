import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientContactsRequest } from './fetch-patient-contacts.duck'

export const FETCH_PATIENT_CONTACTS_CREATE_REQUEST = 'FETCH_PATIENT_CONTACTS_CREATE_REQUEST';
export const FETCH_PATIENT_CONTACTS_CREATE_SUCCESS = 'FETCH_PATIENT_CONTACTS_CREATE_SUCCESS';
export const FETCH_PATIENT_CONTACTS_CREATE_FAILURE = 'FETCH_PATIENT_CONTACTS_CREATE_FAILURE';

export const fetchPatientContactsCreateRequest = createAction(FETCH_PATIENT_CONTACTS_CREATE_REQUEST);
export const fetchPatientContactsCreateSuccess = createAction(FETCH_PATIENT_CONTACTS_CREATE_SUCCESS);
export const fetchPatientContactsCreateFailure = createAction(FETCH_PATIENT_CONTACTS_CREATE_FAILURE);

export const fetchPatientContactsCreateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_CONTACTS_CREATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.post(`${usersUrls.PATIENTS_URL}/${payload.userId}/contacts`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;

          return [
            fetchPatientContactsCreateSuccess(response),
            fetchPatientContactsRequest({ userId }),
          ];
        })
        .catch(error => Observable.of(fetchPatientContactsCreateFailure(error)))
    );

export default function reducer(patientContactsCreate = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_CONTACTS_CREATE_SUCCESS:
      return action.payload;
    default:
      return patientContactsCreate
  }
}
