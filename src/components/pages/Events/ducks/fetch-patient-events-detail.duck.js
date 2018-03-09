import _ from 'lodash/fp';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_PATIENT_EVENTS_DETAIL_REQUEST = 'FETCH_PATIENT_EVENTS_DETAIL_REQUEST';
export const FETCH_PATIENT_EVENTS_DETAIL_SUCCESS = 'FETCH_PATIENT_EVENTS_DETAIL_SUCCESS';
export const FETCH_PATIENT_EVENTS_DETAIL_FAILURE = 'FETCH_PATIENT_EVENTS_DETAIL_FAILURE';

export const fetchPatientEventsDetailRequest = createAction(FETCH_PATIENT_EVENTS_DETAIL_REQUEST);
export const fetchPatientEventsDetailSuccess = createAction(FETCH_PATIENT_EVENTS_DETAIL_SUCCESS);
export const fetchPatientEventsDetailFailure = createAction(FETCH_PATIENT_EVENTS_DETAIL_FAILURE);

export const fetchPatientEventsDetailEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_EVENTS_DETAIL_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/events/${payload.sourceId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientEventsDetailSuccess({
          userId: payload.userId,
          eventsDetail: response,
          token: response.token,
        }))
    );

export default function reducer(eventsDetail = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_EVENTS_DETAIL_SUCCESS:
      return _.set(action.payload.userId, action.payload.eventsDetail, eventsDetail);
    default:
      return eventsDetail;
  }
}