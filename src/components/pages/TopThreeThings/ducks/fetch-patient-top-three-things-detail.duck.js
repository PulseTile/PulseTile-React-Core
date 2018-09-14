import _ from 'lodash/fp';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_PATIENT_TOP_THREE_THINGS_DETAIL_REQUEST = 'FETCH_PATIENT_TOP_THREE_THINGS_DETAIL_REQUEST';
export const FETCH_PATIENT_TOP_THREE_THINGS_DETAIL_SUCCESS = 'FETCH_PATIENT_TOP_THREE_THINGS_DETAIL_SUCCESS';
export const FETCH_PATIENT_TOP_THREE_THINGS_DETAIL_FAILURE = 'FETCH_PATIENT_TOP_THREE_THINGS_DETAIL_FAILURE';

export const fetchPatientTopThreeThingsDetailRequest = createAction(FETCH_PATIENT_TOP_THREE_THINGS_DETAIL_REQUEST);
export const fetchPatientTopThreeThingsDetailSuccess = createAction(FETCH_PATIENT_TOP_THREE_THINGS_DETAIL_SUCCESS);
export const fetchPatientTopThreeThingsDetailFailure = createAction(FETCH_PATIENT_TOP_THREE_THINGS_DETAIL_FAILURE);

export const fetchPatientTopThreeThingsDetailEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_TOP_THREE_THINGS_DETAIL_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/top3Things/${payload.sourceId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientTopThreeThingsDetailSuccess({
          userId: payload.userId,
          topThreeThingsDetail: response,
          token: response.token,
        }))
    );

export default function reducer(topThreeThingsDetail = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_TOP_THREE_THINGS_DETAIL_SUCCESS:
      return _.set(action.payload.userId, action.payload.topThreeThingsDetail, topThreeThingsDetail);
    default:
      return topThreeThingsDetail;
  }
}