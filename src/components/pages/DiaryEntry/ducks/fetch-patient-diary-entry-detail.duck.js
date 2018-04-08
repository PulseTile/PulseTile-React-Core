import _ from 'lodash/fp';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { hasTokenInResponse } from '../../../../utils/plugin-helpers.utils';

export const FETCH_PATIENT_DIARY_ENTRY_DETAIL_REQUEST = 'FETCH_PATIENT_DIARY_ENTRY_DETAIL_REQUEST';
export const FETCH_PATIENT_DIARY_ENTRY_DETAIL_SUCCESS = 'FETCH_PATIENT_DIARY_ENTRY_DETAIL_SUCCESS';
export const FETCH_PATIENT_DIARY_ENTRY_DETAIL_FAILURE = 'FETCH_PATIENT_DIARY_ENTRY_DETAIL_FAILURE';

export const fetchPatientDiaryEntryDetailRequest = createAction(FETCH_PATIENT_DIARY_ENTRY_DETAIL_REQUEST);
export const fetchPatientDiaryEntryDetailSuccess = createAction(FETCH_PATIENT_DIARY_ENTRY_DETAIL_SUCCESS);
export const fetchPatientDiaryEntryDetailFailure = createAction(FETCH_PATIENT_DIARY_ENTRY_DETAIL_FAILURE);

export const fetchPatientDiaryEntryDetailEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_DIARY_ENTRY_DETAIL_REQUEST)
    .map(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/diary-entry/${payload.sourceId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientDiaryEntryDetailSuccess({
          response,
          userId: payload.userId,
          diaryEntryDetail: response,
          token: response.token,
        }))
    );

export default function reducer(diaryEntryDetail = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_DIARY_ENTRY_DETAIL_SUCCESS:
      return _.set(action.payload.userId, action.payload.diaryEntryDetail, diaryEntryDetail);
    default:
      return diaryEntryDetail;
  }
}
