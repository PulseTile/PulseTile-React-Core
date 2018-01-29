import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientVitalsDetailRequest } from './fetch-patient-vitals-detail.duck';
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_PATIENT_VITALS_REQUEST = 'FETCH_PATIENT_VITALS_REQUEST';
export const FETCH_PATIENT_VITALS_SUCCESS = 'FETCH_PATIENT_VITALS_SUCCESS';
export const FETCH_PATIENT_VITALS_FAILURE = 'FETCH_PATIENT_VITALS_FAILURE';
export const FETCH_PATIENT_VITALS_UPDATE_REQUEST = 'FETCH_PATIENT_VITALS_UPDATE_REQUEST';

export const fetchPatientVitalsRequest = createAction(FETCH_PATIENT_VITALS_REQUEST);
export const fetchPatientVitalsSuccess = createAction(FETCH_PATIENT_VITALS_SUCCESS);
export const fetchPatientVitalsFailure = createAction(FETCH_PATIENT_VITALS_FAILURE);
export const fetchPatientVitalsUpdateRequest = createAction(FETCH_PATIENT_VITALS_UPDATE_REQUEST);

export const fetchPatientVitalsEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_VITALS_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/vitalsigns`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientVitalsSuccess({
          userId: payload.userId,
          vitals: response,
        }))
        .catch(error => Observable.of(handleErrors(error)))
    );

export const fetchPatientVitalsUpdateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_VITALS_UPDATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/vitalsigns`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .flatMap((response) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;

          return [
            fetchPatientVitalsSuccess({ userId, vitals: response }),
            fetchPatientVitalsDetailRequest({ userId, sourceId }),
          ]
        })
        .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(patientsVitals = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_VITALS_SUCCESS:
      return _.set(action.payload.userId, action.payload.vitals, patientsVitals);
    default:
      return patientsVitals;
  }
}
