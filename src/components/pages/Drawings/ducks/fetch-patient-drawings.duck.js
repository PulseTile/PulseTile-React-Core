import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientDrawingsDetailRequest } from './fetch-patient-drawings-detail.duck';
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_PATIENT_DRAWINGS_REQUEST = 'FETCH_PATIENT_DRAWINGS_REQUEST';
export const FETCH_PATIENT_DRAWINGS_SUCCESS = 'FETCH_PATIENT_DRAWINGS_SUCCESS';
export const FETCH_PATIENT_DRAWINGS_FAILURE = 'FETCH_PATIENT_DRAWINGS_FAILURE';
export const FETCH_PATIENT_DRAWINGS_UPDATE_REQUEST = 'FETCH_PATIENT_DRAWINGS_UPDATE_REQUEST';

export const fetchPatientDrawingsRequest = createAction(FETCH_PATIENT_DRAWINGS_REQUEST);
export const fetchPatientDrawingsSuccess = createAction(FETCH_PATIENT_DRAWINGS_SUCCESS);
export const fetchPatientDrawingsFailure = createAction(FETCH_PATIENT_DRAWINGS_FAILURE);
export const fetchPatientDrawingsUpdateRequest = createAction(FETCH_PATIENT_DRAWINGS_UPDATE_REQUEST);

export const fetchPatientDrawingsEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_DRAWINGS_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PICTURES}/${payload.userId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientDrawingsSuccess({
          userId: payload.userId,
          drawings: response,
        }))
        // .catch(error => Observable.of(handleErrors(error)))
    );

export const fetchPatientDrawingsUpdateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_DRAWINGS_UPDATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PICTURES}/${payload.userId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .flatMap((response) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;

          return [
            fetchPatientDrawingsSuccess({ userId, drawings: response }),
            fetchPatientDrawingsDetailRequest({ userId, sourceId }),
          ]
        })
        // .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(patientsDrawings = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_DRAWINGS_SUCCESS:
      return _.set(action.payload.userId, action.payload.drawings, patientsDrawings);
    default:
      return patientsDrawings;
  }
}
