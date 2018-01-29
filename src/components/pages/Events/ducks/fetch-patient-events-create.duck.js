import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientEventsRequest } from './fetch-patient-events.duck'
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_PATIENT_EVENTS_CREATE_REQUEST = 'FETCH_PATIENT_EVENTS_CREATE_REQUEST';
export const FETCH_PATIENT_EVENTS_CREATE_SUCCESS = 'FETCH_PATIENT_EVENTS_CREATE_SUCCESS';
export const FETCH_PATIENT_EVENTS_CREATE_FAILURE = 'FETCH_PATIENT_EVENTS_CREATE_FAILURE';

export const fetchPatientEventsCreateRequest = createAction(FETCH_PATIENT_EVENTS_CREATE_REQUEST);
export const fetchPatientEventsCreateSuccess = createAction(FETCH_PATIENT_EVENTS_CREATE_SUCCESS);
export const fetchPatientEventsCreateFailure = createAction(FETCH_PATIENT_EVENTS_CREATE_FAILURE);

export const fetchPatientEventsCreateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_EVENTS_CREATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.post(`${usersUrls.PATIENTS_URL}/${payload.userId}/events`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;

          return [
            fetchPatientEventsCreateSuccess(response),
            fetchPatientEventsRequest({ userId }),
          ];
        })
        .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(patientEventsCreate = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_EVENTS_CREATE_SUCCESS:
      return action.payload;
    default:
      return patientEventsCreate
  }
}
