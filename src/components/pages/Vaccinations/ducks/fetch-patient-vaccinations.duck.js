import _ from 'lodash/fp';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';
import { get } from 'lodash';

import { usersUrls } from '../../../../config/server-urls.constants'
import { testConstants } from '../../../../config/for-test.constants';

import { fetchPatientVaccinationsDetailRequest } from './fetch-patient-vaccinations-detail.duck';
import { hasTokenInResponse } from '../../../../utils/plugin-helpers.utils';

export const FETCH_PATIENT_VACCINATIONS_REQUEST = 'FETCH_PATIENT_VACCINATIONS_REQUEST';
export const FETCH_PATIENT_VACCINATIONS_SYNOPSIS_REQUEST = 'FETCH_PATIENT_VACCINATIONS_SYNOPSIS_REQUEST';
export const FETCH_PATIENT_VACCINATIONS_SUCCESS = 'FETCH_PATIENT_VACCINATIONS_SUCCESS';
export const FETCH_PATIENT_VACCINATIONS_FAILURE = 'FETCH_PATIENT_VACCINATIONS_FAILURE';
export const FETCH_PATIENT_VACCINATIONS_UPDATE_REQUEST = 'FETCH_PATIENT_VACCINATIONS_UPDATE_REQUEST';

export const fetchPatientVaccinationsRequest = createAction(FETCH_PATIENT_VACCINATIONS_REQUEST);
export const fetchPatientVaccinationsSynopsisRequest = createAction(FETCH_PATIENT_VACCINATIONS_SYNOPSIS_REQUEST);
export const fetchPatientVaccinationsSuccess = createAction(FETCH_PATIENT_VACCINATIONS_SUCCESS);
export const fetchPatientVaccinationsFailure = createAction(FETCH_PATIENT_VACCINATIONS_FAILURE);
export const fetchPatientVaccinationsUpdateRequest = createAction(FETCH_PATIENT_VACCINATIONS_UPDATE_REQUEST);

export const fetchPatientVaccinationsEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_VACCINATIONS_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/vaccinations`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map((response) => {
          const token = hasTokenInResponse(response);
          return fetchPatientVaccinationsSuccess({
            userId: payload.userId,
            vaccinations: response,
            token,
          })
        })
    );

export const fetchPatientVaccinationsSynopsisEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_VACCINATIONS_SYNOPSIS_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/synopsis/vaccinations`, {})
        .map(response => fetchPatientVaccinationsSuccess({
          userId: payload.userId,
          vaccinations: get(response, 'synopsis', []),
        }))
    );

export const fetchPatientVaccinationsUpdateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_VACCINATIONS_UPDATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/vaccinations`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .flatMap((response) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;

          return [
            fetchPatientVaccinationsSuccess({ userId, vaccinations: response }),
            fetchPatientVaccinationsDetailRequest({ userId, sourceId }),
          ]
        })
    );

export default function reducer(patientsVaccinations = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_VACCINATIONS_SUCCESS:
      return _.set(action.payload.userId, action.payload.vaccinations, patientsVaccinations);
    default:
      return patientsVaccinations;
  }
}
