import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_PATIENT_PERSONAL_NOTES_DETAIL_REQUEST = 'FETCH_PATIENT_PERSONAL_NOTES_DETAIL_REQUEST';
export const FETCH_PATIENT_PERSONAL_NOTES_DETAIL_SUCCESS = 'FETCH_PATIENT_PERSONAL_NOTES_DETAIL_SUCCESS';
export const FETCH_PATIENT_PERSONAL_NOTES_DETAIL_FAILURE = 'FETCH_PATIENT_PERSONAL_NOTES_DETAIL_FAILURE';

export const fetchPatientPersonalNotesDetailRequest = createAction(FETCH_PATIENT_PERSONAL_NOTES_DETAIL_REQUEST);
export const fetchPatientPersonalNotesDetailSuccess = createAction(FETCH_PATIENT_PERSONAL_NOTES_DETAIL_SUCCESS);
export const fetchPatientPersonalNotesDetailFailure = createAction(FETCH_PATIENT_PERSONAL_NOTES_DETAIL_FAILURE);

export const fetchPatientPersonalNotesDetailEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_PERSONAL_NOTES_DETAIL_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/personalnotes/${payload.sourceId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientPersonalNotesDetailSuccess({
          userId: payload.userId,
          personalNotesDetail: response,
        }))
        // .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(personalNotesDetail = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_PERSONAL_NOTES_DETAIL_SUCCESS:
      return _.set(action.payload.userId, action.payload.personalNotesDetail, personalNotesDetail);
    default:
      return personalNotesDetail;
  }
}