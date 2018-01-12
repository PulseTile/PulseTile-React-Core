import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientEventsUpdateRequest } from './fetch-patient-events.duck'

export const FETCH_PATIENT_EVENTS_DETAIL_EDIT_REQUEST = 'FETCH_PATIENT_EVENTS_DETAIL_EDIT_REQUEST';
export const FETCH_PATIENT_EVENTS_DETAIL_EDIT_SUCCESS = 'FETCH_PATIENT_EVENTS_DETAIL_EDIT_SUCCESS';
export const FETCH_PATIENT_EVENTS_DETAIL_EDIT_FAILURE = 'FETCH_PATIENT_EVENTS_DETAIL_EDIT_FAILURE';

export const fetchPatientEventsDetailEditRequest = createAction(FETCH_PATIENT_EVENTS_DETAIL_EDIT_REQUEST);
export const fetchPatientEventsDetailEditSuccess = createAction(FETCH_PATIENT_EVENTS_DETAIL_EDIT_SUCCESS);
export const fetchPatientEventsDetailEditFailure = createAction(FETCH_PATIENT_EVENTS_DETAIL_EDIT_FAILURE);

export const fetchPatientEventsDetailEditEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_EVENTS_DETAIL_EDIT_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.put(`${usersUrls.PATIENTS_URL}/${payload.userId}/events/${payload.sourceId}`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;

          return [
            fetchPatientEventsDetailEditSuccess(response),
            fetchPatientEventsUpdateRequest({ userId, sourceId }),
          ];
        })
        .catch(error => Observable.of(fetchPatientEventsDetailEditFailure(error)))
    );

export default function reducer(eventsDetailEdit = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_EVENTS_DETAIL_EDIT_SUCCESS:
      return action.payload;
    default:
      return eventsDetailEdit;
  }
}
