import _ from 'lodash/fp';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_PATIENT_PROMS_DETAIL_REQUEST = 'FETCH_PATIENT_PROMS_DETAIL_REQUEST';
export const FETCH_PATIENT_PROMS_DETAIL_SUCCESS = 'FETCH_PATIENT_PROMS_DETAIL_SUCCESS';
export const FETCH_PATIENT_PROMS_DETAIL_FAILURE = 'FETCH_PATIENT_PROMS_DETAIL_FAILURE';

export const fetchPatientPromsDetailRequest = createAction(FETCH_PATIENT_PROMS_DETAIL_REQUEST);
export const fetchPatientPromsDetailSuccess = createAction(FETCH_PATIENT_PROMS_DETAIL_SUCCESS);
export const fetchPatientPromsDetailFailure = createAction(FETCH_PATIENT_PROMS_DETAIL_FAILURE);

export const fetchPatientPromsDetailEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_PROMS_DETAIL_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/proms/${payload.sourceId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientPromsDetailSuccess({
          userId: payload.userId,
          promsDetail: response,
          token: response.token,
        }))
    );

export default function reducer(promsDetail = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_PROMS_DETAIL_SUCCESS:
      return _.set(action.payload.userId, action.payload.promsDetail, promsDetail);
    default:
      return promsDetail;
  }
}
