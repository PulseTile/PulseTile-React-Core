import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_PATIENT_CONTACTS_REQUEST = 'FETCH_PATIENT_CONTACTS_REQUEST';
export const FETCH_PATIENT_CONTACTS_SUCCESS = 'FETCH_PATIENT_CONTACTS_SUCCESS';
export const FETCH_PATIENT_CONTACTS_FAILURE = 'FETCH_PATIENT_CONTACTS_FAILURE';

export const fetchPatientContactsRequest = createAction(FETCH_PATIENT_CONTACTS_REQUEST);
export const fetchPatientContactsSuccess = createAction(FETCH_PATIENT_CONTACTS_SUCCESS);
export const fetchPatientContactsFailure = createAction(FETCH_PATIENT_CONTACTS_FAILURE);

export const fetchPatientContactsEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_CONTACTS_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/contacts`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientContactsSuccess({
          userId: payload.userId,
          contacts: response,
        }))
        .catch(error => Observable.of(fetchPatientContactsFailure(error)))
    );

export default function reducer(patientsContacts = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_CONTACTS_SUCCESS:
      return _.set(action.payload.userId, action.payload.contacts, patientsContacts);
    default:
      return patientsContacts;
  }
}
