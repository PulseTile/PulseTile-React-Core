import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientDiaryEntryRequest } from './fetch-patient-diary-entry.duck'

export const FETCH_PATIENT_DIARY_ENTRY_CREATE_REQUEST = 'FETCH_PATIENT_DIARY_ENTRY_CREATE_REQUEST';
export const FETCH_PATIENT_DIARY_ENTRY_CREATE_SUCCESS = 'FETCH_PATIENT_DIARY_ENTRY_CREATE_SUCCESS';
export const FETCH_PATIENT_DIARY_ENTRY_CREATE_FAILURE = 'FETCH_PATIENT_DIARY_ENTRY_CREATE_FAILURE';

export const fetchPatientDiaryEntryCreateRequest = createAction(FETCH_PATIENT_DIARY_ENTRY_CREATE_REQUEST);
export const fetchPatientDiaryEntryCreateSuccess = createAction(FETCH_PATIENT_DIARY_ENTRY_CREATE_SUCCESS);
export const fetchPatientDiaryEntryCreateFailure = createAction(FETCH_PATIENT_DIARY_ENTRY_CREATE_FAILURE);

export const fetchPatientDiaryEntryCreateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_DIARY_ENTRY_CREATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.post(`${usersUrls.PATIENTS_URL}/${payload.userId}/diary-entry`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;

          return [
            fetchPatientDiaryEntryCreateSuccess(response),
            fetchPatientDiaryEntryRequest({ userId }),
          ];
        })
    );

export default function reducer(patientDiaryEntryCreate = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_DIARY_ENTRY_CREATE_SUCCESS:
      return action.payload;
    default:
      return patientDiaryEntryCreate
  }
}
