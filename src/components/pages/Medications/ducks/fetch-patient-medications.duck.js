import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';
import { get } from 'lodash';

import { usersUrls } from '../../../../config/server-urls.constants'
import { testConstants } from '../../../../config/for-test.constants';

import { fetchPatientMedicationsDetailRequest } from './fetch-patient-medications-detail.duck';
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_PATIENT_MEDICATIONS_REQUEST = 'FETCH_PATIENT_MEDICATIONS_REQUEST';
export const FETCH_PATIENT_MEDICATIONS_SYNOPSIS_REQUEST = 'FETCH_PATIENT_MEDICATIONS_SYNOPSIS_REQUEST';
export const FETCH_PATIENT_MEDICATIONS_SUCCESS = 'FETCH_PATIENT_MEDICATIONS_SUCCESS';
export const FETCH_PATIENT_MEDICATIONS_FAILURE = 'FETCH_PATIENT_MEDICATIONS_FAILURE';
export const FETCH_PATIENT_MEDICATIONS_UPDATE_REQUEST = 'FETCH_PATIENT_MEDICATIONS_UPDATE_REQUEST';

export const fetchPatientMedicationsRequest = createAction(FETCH_PATIENT_MEDICATIONS_REQUEST);
export const fetchPatientMedicationsSynopsisRequest = createAction(FETCH_PATIENT_MEDICATIONS_SYNOPSIS_REQUEST);
export const fetchPatientMedicationsSuccess = createAction(FETCH_PATIENT_MEDICATIONS_SUCCESS);
export const fetchPatientMedicationsFailure = createAction(FETCH_PATIENT_MEDICATIONS_FAILURE);
export const fetchPatientMedicationsUpdateRequest = createAction(FETCH_PATIENT_MEDICATIONS_UPDATE_REQUEST);

export const fetchPatientMedicationsEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_MEDICATIONS_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/medications`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientMedicationsSuccess({
          userId: payload.userId,
          medications: get(response, 'synopsis', []),
        }))
        // .catch(error => Observable.of(handleErrors(error)))
    );

export const fetchPatientMedicationsSynopsisEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_MEDICATIONS_SYNOPSIS_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/synopsis/medications`, {})
        .map(response => fetchPatientMedicationsSuccess({
          userId: payload.userId,
          medications: get(response, 'synopsis', []),
        }))
        .catch(error => Observable.of(handleErrors(error)))
    );

export const fetchPatientMedicationsUpdateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_MEDICATIONS_UPDATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/medications`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .flatMap((response) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;
          return [
            fetchPatientMedicationsSuccess({ userId, medications: response }),
            fetchPatientMedicationsDetailRequest({ userId, sourceId }),
          ]
        })
        // .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(patientsMedications = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_MEDICATIONS_SUCCESS:
      return _.set(action.payload.userId, action.payload.medications, patientsMedications);
    default:
      return patientsMedications;
  }
}
