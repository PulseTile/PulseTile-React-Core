import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_PATIENT_ALLERGIES_DETAIL_REQUEST = 'FETCH_PATIENT_ALLERGIES_DETAIL_REQUEST';
export const FETCH_PATIENT_ALLERGIES_DETAIL_SUCCESS = 'FETCH_PATIENT_ALLERGIES_DETAIL_SUCCESS';
export const FETCH_PATIENT_ALLERGIES_DETAIL_FAILURE = 'FETCH_PATIENT_ALLERGIES_DETAIL_FAILURE';

export const fetchPatientAllergiesDetailRequest = createAction(FETCH_PATIENT_ALLERGIES_DETAIL_REQUEST);
export const fetchPatientAllergiesDetailSuccess = createAction(FETCH_PATIENT_ALLERGIES_DETAIL_SUCCESS);
export const fetchPatientAllergiesDetailFailure = createAction(FETCH_PATIENT_ALLERGIES_DETAIL_FAILURE);

export const fetchPatientAllergiesDetailEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_ALLERGIES_DETAIL_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/allergies/${payload.sourceId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientAllergiesDetailSuccess({
          userId: payload.userId,
          allergiesDetail: response,
        }))
        .catch(error => Observable.of(fetchPatientAllergiesDetailFailure(error)))
    );

export default function reducer(allergiesDetail = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_ALLERGIES_DETAIL_SUCCESS:
      return _.set(action.payload.userId, action.payload.allergiesDetail, allergiesDetail);
    default:
      return allergiesDetail;
  }
}