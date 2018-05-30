import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientDiaryEntryUpdateRequest } from './fetch-patient-diary-entry.duck'

export const FETCH_PATIENT_DIARY_ENTRY_DETAIL_EDIT_REQUEST = 'FETCH_PATIENT_DIARY_ENTRY_DETAIL_EDIT_REQUEST';
export const FETCH_PATIENT_DIARY_ENTRY_DETAIL_EDIT_SUCCESS = 'FETCH_PATIENT_DIARY_ENTRY_DETAIL_EDIT_SUCCESS';
export const FETCH_PATIENT_DIARY_ENTRY_DETAIL_EDIT_FAILURE = 'FETCH_PATIENT_DIARY_ENTRY_DETAIL_EDIT_FAILURE';

export const fetchPatientDiaryEntryDetailEditRequest = createAction(FETCH_PATIENT_DIARY_ENTRY_DETAIL_EDIT_REQUEST);
export const fetchPatientDiaryEntryDetailEditSuccess = createAction(FETCH_PATIENT_DIARY_ENTRY_DETAIL_EDIT_SUCCESS);
export const fetchPatientDiaryEntryDetailEditFailure = createAction(FETCH_PATIENT_DIARY_ENTRY_DETAIL_EDIT_FAILURE);

export const fetchPatientDiaryEntryDetailEditEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_DIARY_ENTRY_DETAIL_EDIT_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.put(`${usersUrls.PATIENTS_URL}/${payload.userId}/diary-entry/${payload.sourceId}`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;

          return [
            fetchPatientDiaryEntryDetailEditSuccess(response),
            fetchPatientDiaryEntryUpdateRequest({ userId, sourceId }),
          ];
        })
    );

export default function reducer(diaryEntryDetailEdit = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_DIARY_ENTRY_DETAIL_EDIT_SUCCESS:
      return action.payload;
    default:
      return diaryEntryDetailEdit;
  }
}
