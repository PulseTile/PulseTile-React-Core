import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';
import { get } from 'lodash';

import { usersUrls } from '../../../../config/server-urls.constants';
import { fetchPatientAllergiesDetailRequest } from './fetch-patient-allergies-detail.duck';
import { handleErrors } from '../../../../ducks/handle-errors.duck';

export const FETCH_PATIENT_ALLERGIES_REQUEST = 'FETCH_PATIENT_ALLERGIES_REQUEST';
export const FETCH_PATIENT_ALLERGIES_SYNOPSIS_REQUEST = 'FETCH_PATIENT_ALLERGIES_SYNOPSIS_REQUEST';
export const FETCH_PATIENT_ALLERGIES_SUCCESS = 'FETCH_PATIENT_ALLERGIES_SUCCESS';
export const FETCH_PATIENT_ALLERGIES_FAILURE = 'FETCH_PATIENT_ALLERGIES_FAILURE';
export const FETCH_PATIENT_ALLERGIES_UPDATE_REQUEST = 'FETCH_PATIENT_ALLERGIES_UPDATE_REQUEST';

export const fetchPatientAllergiesRequest = createAction(FETCH_PATIENT_ALLERGIES_REQUEST);
export const fetchPatientAllergiesSynopsisRequest = createAction(FETCH_PATIENT_ALLERGIES_SYNOPSIS_REQUEST);
export const fetchPatientAllergiesSuccess = createAction(FETCH_PATIENT_ALLERGIES_SUCCESS);
export const fetchPatientAllergiesFailure = createAction(FETCH_PATIENT_ALLERGIES_FAILURE);
export const fetchPatientAllergiesUpdateRequest = createAction(FETCH_PATIENT_ALLERGIES_UPDATE_REQUEST);

export const fetchPatientAllergiesEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_ALLERGIES_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/allergies`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientAllergiesSuccess({
          userId: payload.userId,
          allergies: response,
        }))
        // // .catch(error => Observable.of(handleErrors(error)))
    );

export const fetchPatientAllergiesSynopsisEpic = (action$, store) =>
    action$.ofType(FETCH_PATIENT_ALLERGIES_SYNOPSIS_REQUEST)
        .mergeMap(({ payload }) =>

                // FOR TESTING:
                // ajax.getJSON(`http://dev.ripple.foundation:8000/api/patients/${payload.userId}/synopsis/allergies`, {
                //     Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjYzOTQxMzQsImlhdCI6MTUyNjM5MDUzNCwiaXNzIjoicWV3ZC5qd3QiLCJhcHBsaWNhdGlvbiI6InJpcHBsZS1jZHItb3BlbmVociIsInRpbWVvdXQiOjM2MDAsInFld2QiOiJmMTU3MjQ0NWYxZmM3MWUwYTJkMzE1MTIxOGJmY2Q0ZWEzM2MwYjg1ZGY5MTFkMThhMTMyNjdkZWMzZDE2ODI5ZWYyNGQ1NWZkMzFiNjQzZjk3OGRhZDRkYmJmYjJhNGRiYTNjMjlkMDYxOGFjYWY1NmQ0NGI2MTU1NjUyYTZmYjQxMDhiZDE0ZWE1MzEyZWYwMDNkODVkMGNmZjI2YjJmNzQwZWQ3OGJiZWZiZGJlYzM4ZjJhYjFlZjg0MDI2MGMiLCJuaHNOdW1iZXIiOjk5OTk5OTkwMDAsImVtYWlsIjoiaXZvci5jb3hAcGhyLmxlZWRzLm5ocyIsInJvbGUiOiJwaHJVc2VyIiwidWlkIjoiODU1MGFhNWQ1NDc2NjMzYTQzYzRjODE0ZDMwZjIzNDRlMGFkMTBhN2ZhYzBhZDQ2YjY0YzcyYjlmNWQyY2IzOS44YmI5MThlZTBjZTBkOTA4Iiwib3BlbmlkIjp7ImVtYWlsIjoiaXZvci5jb3hAcGhyLmxlZWRzLm5ocyIsIm5oc051bWJlciI6OTk5OTk5OTAwMCwic3ViIjoiZGY0ZTVjYzQtM2UzOC00NDllLThkNDQtOGMwYzQ3NDg4OTMxIiwiYXRfaGFzaCI6IkZieXI4d2wtY0RJeUM0UGI1c0lnMWciLCJhdWQiOiJmb28iLCJleHAiOjE1MjYzOTQxMjMsImlhdCI6MTUyNjM5MDUyMywiaXNzIjoiaHR0cDovL3d3dy5tZ2F0ZXdheS5jb206ODA4OSIsImlkX3Rva2VuIjoiZXlKaGJHY2lPaUpTVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0lzSW10cFpDSTZJbFoxY0V4eGRIWmhjbXR1UmtsNFgzVkNPRWRDY2tsWlRDMU5SbWQzZWxvM1lYUkpZMUZzWDNWWVVtOGlmUS5leUpsYldGcGJDSTZJbWwyYjNJdVkyOTRRSEJvY2k1c1pXVmtjeTV1YUhNaUxDSnVhSE5PZFcxaVpYSWlPams1T1RrNU9Ua3dNREFzSW5OMVlpSTZJbVJtTkdVMVkyTTBMVE5sTXpndE5EUTVaUzA0WkRRMExUaGpNR00wTnpRNE9Ea3pNU0lzSW1GMFgyaGhjMmdpT2lKR1lubHlPSGRzTFdORVNYbERORkJpTlhOSlp6Rm5JaXdpWVhWa0lqb2labTl2SWl3aVpYaHdJam94TlRJMk16azBNVEl6TENKcFlYUWlPakUxTWpZek9UQTFNak1zSW1semN5STZJbWgwZEhBNkx5OTNkM2N1YldkaGRHVjNZWGt1WTI5dE9qZ3dPRGtpZlEuV0xBeHlZYnFfNjAyMWFDOGREbDFFZjhkVFFvTnRqbF95TExocnY5dnFiWVhJTmtzajVFZ0RRM01FaUhrZnpWVHNKcXhhekhsZlYxTnZGc0lFQklyc1ZWaUp4QVY3VmJ1RGhSXzduYUhub1VyQkc2Y09PZUJJdllTaXJXNUpCR2Q5eDlXZVN4elY2Q3JReHRxU3VFZktYXzFrUFJiTkZXRklkMXJ6a01ILUFNQXpQcy0xc2xvODNuZkc2RXBPdFVfaE1UQU1TQy1tdS13T05ZYWU4RjM4dkhBcTlVMlVuUEt6aGducjNyS0dCQTRvY2pwQmkxcXpvRlM2SFJ2NU95amlOZm1vSXktbXhUbGczZk5IZnpISERrR0xOWkh5QjgwVDY3bGF5MGpydVUwcWRkUDNGTW5Ua3pQck4ycHBtTFk4aUVNOVFwV3JoY2xrRUVYVURtU013In19.UjYahNkJ0_6yN1lPpqvXrewFacrhnStzjwCWs8EsVZg'
                // })
                ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/synopsis/allergies`, {
                    headers: { Cookie: store.getState().credentials.cookie },
                })
                    .map(response => fetchPatientAllergiesSuccess({
                        userId: payload.userId,
                        allergies: get(response, 'synopsis', [])
                    }))
            // // .catch(error => Observable.of(handleErrors(error)))
        );

export const fetchPatientAllergiesUpdateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_ALLERGIES_UPDATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/allergies`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .flatMap((response) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;
          return [
            fetchPatientAllergiesSuccess({ userId, allergies: response }),
            fetchPatientAllergiesDetailRequest({ userId, sourceId }),
          ]
        })
        // .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(patientsAllergies = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_ALLERGIES_SUCCESS:
      return _.set(action.payload.userId, action.payload.allergies, patientsAllergies);
    default:
      return patientsAllergies;
  }
}
