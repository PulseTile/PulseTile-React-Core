import _ from 'lodash/fp';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientDiaryEntryDetailRequest } from './fetch-patient-diary-entry-detail.duck';
import { hasTokenInResponse } from '../../../../utils/plugin-helpers.utils';

export const FETCH_PATIENT_DIARY_ENTRY_REQUEST = 'FETCH_PATIENT_DIARY_ENTRY_REQUEST';
export const FETCH_PATIENT_DIARY_ENTRY_SUCCESS = 'FETCH_PATIENT_DIARY_ENTRY_SUCCESS';
export const FETCH_PATIENT_DIARY_ENTRY_FAILURE = 'FETCH_PATIENT_DIARY_ENTRY_FAILURE';
export const FETCH_PATIENT_DIARY_ENTRY_UPDATE_REQUEST = 'FETCH_PATIENT_DIARY_ENTRY_UPDATE_REQUEST';

export const fetchPatientDiaryEntryRequest = createAction(FETCH_PATIENT_DIARY_ENTRY_REQUEST);
export const fetchPatientDiaryEntrySuccess = createAction(FETCH_PATIENT_DIARY_ENTRY_SUCCESS);
export const fetchPatientDiaryEntryFailure = createAction(FETCH_PATIENT_DIARY_ENTRY_FAILURE);
export const fetchPatientDiaryEntryUpdateRequest = createAction(FETCH_PATIENT_DIARY_ENTRY_UPDATE_REQUEST);

export const fetchPatientDiaryEntryEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_DIARY_ENTRY_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/diary-entry`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map((response) => {
          const token = hasTokenInResponse(response);
          return fetchPatientDiaryEntrySuccess({
            userId: payload.userId,
            diaryEntry: response,
            token,
          })
        })
    );

export const fetchPatientDiaryEntryUpdateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_DIARY_ENTRY_UPDATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/diary-entry`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .flatMap((response) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;

          return [
            fetchPatientDiaryEntrySuccess({ userId, diaryEntry: [{
              sourceId: '5ba985dc-e3fa-4167-845f-3cc9301a5b14',
              author: "bob.smith@gmail.com",
              dateCreated: "2018-04-07",
              noteType: "Exam Report",
              notes: "qwe",
              source: "openehr"
            }] }),
            fetchPatientDiaryEntryDetailRequest({ userId, sourceId }),
          ]
        })

    );

export default function reducer(patientsDiaryEntry = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_DIARY_ENTRY_SUCCESS:
      return _.set(action.payload.userId, action.payload.diaryEntry, patientsDiaryEntry);
    default:
      return patientsDiaryEntry;
  }
}
