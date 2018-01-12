import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientContactsUpdateRequest } from './fetch-patient-contacts.duck'

export const FETCH_PATIENT_CONTACTS_DETAIL_EDIT_REQUEST = 'FETCH_PATIENT_CONTACTS_DETAIL_EDIT_REQUEST';
export const FETCH_PATIENT_CONTACTS_DETAIL_EDIT_SUCCESS = 'FETCH_PATIENT_CONTACTS_DETAIL_EDIT_SUCCESS';
export const FETCH_PATIENT_CONTACTS_DETAIL_EDIT_FAILURE = 'FETCH_PATIENT_CONTACTS_DETAIL_EDIT_FAILURE';

export const fetchPatientContactsDetailEditRequest = createAction(FETCH_PATIENT_CONTACTS_DETAIL_EDIT_REQUEST);
export const fetchPatientContactsDetailEditSuccess = createAction(FETCH_PATIENT_CONTACTS_DETAIL_EDIT_SUCCESS);
export const fetchPatientContactsDetailEditFailure = createAction(FETCH_PATIENT_CONTACTS_DETAIL_EDIT_FAILURE);

export const fetchPatientContactsDetailEditEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_CONTACTS_DETAIL_EDIT_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.put(`${usersUrls.PATIENTS_URL}/${payload.userId}/contacts/${payload.sourceId}`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;

          return [
            fetchPatientContactsDetailEditSuccess(response),
            fetchPatientContactsUpdateRequest({ userId, sourceId }),
          ];
        })
        .catch(error => Observable.of(fetchPatientContactsDetailEditFailure(error)))
    );

export default function reducer(contactsDetailEdit = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_CONTACTS_DETAIL_EDIT_SUCCESS:
      return action.payload;
    default:
      return contactsDetailEdit;
  }
}