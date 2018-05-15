import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientVaccinationsDetailRequest } from './fetch-patient-vaccinations-detail.duck';
import {handleErrors} from "../../../../ducks/handle-errors.duck";

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
        .map(response => fetchPatientVaccinationsSuccess({
          userId: payload.userId,
          vaccinations: response,
        }))
        // .catch(error => Observable.of(handleErrors(error)))
    );

export const fetchPatientVaccinationsSynopsisEpic = (action$, store) =>
    action$.ofType(FETCH_PATIENT_VACCINATIONS_SYNOPSIS_REQUEST)
        .mergeMap(({ payload }) =>

                // FOR TESTING
                // ajax.getJSON(`http://dev.ripple.foundation:8000/api/patients/${payload.userId}/synopsis/vaccinations`, {
                //     Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjYzODk3NzYsImlhdCI6MTUyNjM4NjE3NiwiaXNzIjoicWV3ZC5qd3QiLCJhcHBsaWNhdGlvbiI6InJpcHBsZS1jZHItb3BlbmVociIsInRpbWVvdXQiOjM2MDAsInFld2QiOiJmMTU3MjQ0NWYxZmM3MWUwYTJkMzE1MTIxOGJmY2Q0ZWEzM2MwYjg1ZGY5MTFkMThhMTMyNjdkZWMzZDE2ODI5ZWYyNGQ1NWZkMzFiNjQzZjk3OGRhZDRkYmJmYjJhNGRiYTNjMjlkMDYxOGFjYWY1NmQ0NGI2MTU1NjUyYTZmYjQxMDhiZDE0ZWE1MzEyZWYwMDNkODVkMGNmZjI2YjJmNzQwZWQ3OGJiZWZiZGJlYzM4ZjJhYjFlZjg0MDI2MGMiLCJuaHNOdW1iZXIiOjk5OTk5OTkwMDAsImVtYWlsIjoiaXZvci5jb3hAcGhyLmxlZWRzLm5ocyIsInJvbGUiOiJwaHJVc2VyIiwidWlkIjoiODhiODM1NzNlOWY0NDYyNTRkNTViOGRmOGE1OGIzN2FmNjM1ZjgxYTE0OTg2NjFhNmM5NjM2Zjc2ZjZiMjliNS42YmQxMGYzM2YyNDFjOTk2Iiwib3BlbmlkIjp7ImVtYWlsIjoiaXZvci5jb3hAcGhyLmxlZWRzLm5ocyIsIm5oc051bWJlciI6OTk5OTk5OTAwMCwic3ViIjoiZGY0ZTVjYzQtM2UzOC00NDllLThkNDQtOGMwYzQ3NDg4OTMxIiwiYXRfaGFzaCI6IllhdDFBY08wNTVOMmxnUTUxWW05dEEiLCJhdWQiOiJmb28iLCJleHAiOjE1MjYzODk3NDgsImlhdCI6MTUyNjM4NjE0OCwiaXNzIjoiaHR0cDovL3d3dy5tZ2F0ZXdheS5jb206ODA4OSIsImlkX3Rva2VuIjoiZXlKaGJHY2lPaUpTVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0lzSW10cFpDSTZJbFoxY0V4eGRIWmhjbXR1UmtsNFgzVkNPRWRDY2tsWlRDMU5SbWQzZWxvM1lYUkpZMUZzWDNWWVVtOGlmUS5leUpsYldGcGJDSTZJbWwyYjNJdVkyOTRRSEJvY2k1c1pXVmtjeTV1YUhNaUxDSnVhSE5PZFcxaVpYSWlPams1T1RrNU9Ua3dNREFzSW5OMVlpSTZJbVJtTkdVMVkyTTBMVE5sTXpndE5EUTVaUzA0WkRRMExUaGpNR00wTnpRNE9Ea3pNU0lzSW1GMFgyaGhjMmdpT2lKWllYUXhRV05QTURVMVRqSnNaMUUxTVZsdE9YUkJJaXdpWVhWa0lqb2labTl2SWl3aVpYaHdJam94TlRJMk16ZzVOelE0TENKcFlYUWlPakUxTWpZek9EWXhORGdzSW1semN5STZJbWgwZEhBNkx5OTNkM2N1YldkaGRHVjNZWGt1WTI5dE9qZ3dPRGtpZlEuR2dVUzZYb21MVFVSQUtwUWd5WFNfZ2VYNEZfUWR2Z0pVTmtRLWhFNG05Y2hRbDFFNEVwbmljRUp0QWVHYUNub2o0bU5UbDNSc2hzQmw5WHMxZVpJVmpKYXlEeEI3cmtUNFVKb1phdF9rRGczc1JoTEpkTU02ZE9EM3lDU3Q3aHYtY0d2d0ZuUkpwTURUa2JKWHE2bjByS0tCYUxYOVhYZnRtamNNZUN4LV91M1VaQk9yaER2dE1lUGx6Z2NfaVQzT1AyekduMmRmOXpoMVJWY0FVa1FWT0VPLUo4UXpDOWI3R3haa1daVGQ1dXlfOXBISE9zR0ZoUWRZSXVvSmxSMDNXejZnQ0oyaEJNajNaS2xpcGVQVG1qTUpVczl0cExIRlhLT1dKWEZUZnI3TlNVMFdLTHhGamRheEtyeGdzVlowZ1FtcVFLMmVtX3FDVkhRNHlHZ3VRIn19.MXpvTKmCua3WQKiwRNW3_5R7uSf3fYfXQO5NJaYGwt0'
                // })

                ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/synopsis/vaccinations`, {
                    headers: { Cookie: store.getState().credentials.cookie },
                })
                    .map(response => fetchPatientVaccinationsSuccess({
                        userId: payload.userId,
                        vaccinations: get(response, 'synopsis', []),
                    }))
            // .catch(error => Observable.of(handleErrors(error)))
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
        // .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(patientsVaccinations = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_VACCINATIONS_SUCCESS:
      return _.set(action.payload.userId, action.payload.vaccinations, patientsVaccinations);
    default:
      return patientsVaccinations;
  }
}
