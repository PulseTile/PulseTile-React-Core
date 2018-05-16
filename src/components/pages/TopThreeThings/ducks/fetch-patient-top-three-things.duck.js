import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';
import { get } from 'lodash';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientTopThreeThingsDetailRequest } from './fetch-patient-top-three-things-detail.duck';

export const FETCH_PATIENT_TOP_THREE_THINGS_REQUEST = 'FETCH_PATIENT_TOP_THREE_THINGS_REQUEST';
export const FETCH_PATIENT_TOP_THREE_THINGS_SYNOPSIS_REQUEST = 'FETCH_PATIENT_TOP_THREE_THINGS_SYNOPSIS_REQUEST';
export const FETCH_PATIENT_TOP_THREE_THINGS_SUCCESS = 'FETCH_PATIENT_TOP_THREE_THINGS_SUCCESS';
export const FETCH_PATIENT_TOP_THREE_THINGS_FAILURE = 'FETCH_PATIENT_TOP_THREE_THINGS_FAILURE';
export const FETCH_PATIENT_TOP_THREE_THINGS_UPDATE_REQUEST = 'FETCH_PATIENT_TOP_THREE_THINGS_UPDATE_REQUEST';

export const fetchPatientTopThreeThingsRequest = createAction(FETCH_PATIENT_TOP_THREE_THINGS_REQUEST);
export const fetchPatientTopThreeThingsSynopsisRequest = createAction(FETCH_PATIENT_TOP_THREE_THINGS_SYNOPSIS_REQUEST);
export const fetchPatientTopThreeThingsSuccess = createAction(FETCH_PATIENT_TOP_THREE_THINGS_SUCCESS);
export const fetchPatientTopThreeThingsFailure = createAction(FETCH_PATIENT_TOP_THREE_THINGS_FAILURE);
export const fetchPatientTopThreeThingsUpdateRequest = createAction(FETCH_PATIENT_TOP_THREE_THINGS_UPDATE_REQUEST);

export const fetchPatientTopThreeThingsEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_TOP_THREE_THINGS_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/top3Things`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientTopThreeThingsSuccess({
          userId: payload.userId,
          topThreeThings: response,
        }))
        .catch(error => Observable.of(fetchPatientTopThreeThingsFailure(error)))
    );

export const fetchPatientTopThreeThingsSynopsisEpic = (action$, store) =>
    action$.ofType(FETCH_PATIENT_TOP_THREE_THINGS_SYNOPSIS_REQUEST)
        .mergeMap(({ payload }) =>

            // FOR TESTING
            // ajax.getJSON(`http://dev.ripple.foundation:8000/api/patients/${payload.userId}/synopsis/top3Things`, {
            //     Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjY0Njg3ODAsImlhdCI6MTUyNjQ2NTE4MCwiaXNzIjoicWV3ZC5qd3QiLCJhcHBsaWNhdGlvbiI6InJpcHBsZS1jZHItb3BlbmVociIsInRpbWVvdXQiOjM2MDAsInFld2QiOiJmMTU3MjQ0NWYxZmM3MWUwYTJkMzE1MTIxOGJmY2Q0ZWEzM2MwYjg1ZGY5MTFkMThhMTMyNjdkZWMzZDE2ODI5ZWYyNGQ1NWZkMzFiNjQzZjk3OGRhZDRkYmJmYjJhNGRiYTNjMjlkMDYxOGFjYWY1NmQ0NGI2MTU1NjUyYTZmYjQxMDhiZDE0ZWE1MzEyZWYwMDNkODVkMGNmZjI2YjJmNzQwZWQ3OGJiZWZiZGJlYzM4ZjJhYjFlZjg0MDI2MGMiLCJuaHNOdW1iZXIiOjk5OTk5OTkwMDAsImVtYWlsIjoiaXZvci5jb3hAcGhyLmxlZWRzLm5ocyIsInJvbGUiOiJwaHJVc2VyIiwidWlkIjoiZGJiYWM5ODY1NWFjN2I2MmE3MzQ0OWQ2ZDJlMDM3NTQyNjc3OGZkM2I3NWMyYWQwMzllZjVjZDA0NmY0MDdmOC4xMDAwZWM3MzVhYjQxNGIxIiwib3BlbmlkIjp7ImVtYWlsIjoiaXZvci5jb3hAcGhyLmxlZWRzLm5ocyIsIm5oc051bWJlciI6OTk5OTk5OTAwMCwic3ViIjoiZGY0ZTVjYzQtM2UzOC00NDllLThkNDQtOGMwYzQ3NDg4OTMxIiwiYXRfaGFzaCI6ImZOSmJVdWdSSV8tTFZrYm5FdlpQX2ciLCJhdWQiOiJmb28iLCJleHAiOjE1MjY0Njg2MzAsImlhdCI6MTUyNjQ2NTAzMCwiaXNzIjoiaHR0cDovL3d3dy5tZ2F0ZXdheS5jb206ODA4OSIsImlkX3Rva2VuIjoiZXlKaGJHY2lPaUpTVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0lzSW10cFpDSTZJbFoxY0V4eGRIWmhjbXR1UmtsNFgzVkNPRWRDY2tsWlRDMU5SbWQzZWxvM1lYUkpZMUZzWDNWWVVtOGlmUS5leUpsYldGcGJDSTZJbWwyYjNJdVkyOTRRSEJvY2k1c1pXVmtjeTV1YUhNaUxDSnVhSE5PZFcxaVpYSWlPams1T1RrNU9Ua3dNREFzSW5OMVlpSTZJbVJtTkdVMVkyTTBMVE5sTXpndE5EUTVaUzA0WkRRMExUaGpNR00wTnpRNE9Ea3pNU0lzSW1GMFgyaGhjMmdpT2lKbVRrcGlWWFZuVWtsZkxVeFdhMkp1UlhaYVVGOW5JaXdpWVhWa0lqb2labTl2SWl3aVpYaHdJam94TlRJMk5EWTROak13TENKcFlYUWlPakUxTWpZME5qVXdNekFzSW1semN5STZJbWgwZEhBNkx5OTNkM2N1YldkaGRHVjNZWGt1WTI5dE9qZ3dPRGtpZlEuTEotQWVsT2JHdHcwMHVlbXB4YWQ0RDgzekNIamwtZnhYSmV4SWRuUE43bWFjaUFKSEVfX05OcVgtbDdvNGl4QjhPelRUeGpFbks4bkVCSkhFZ0RLZG5HVzZMSDJvdzg2aklSYUM1Q05qWVJuR3F5b2NISEljR2ZUYWJObEhlMGpTejE0WGVpZ1kweGhLTy1SU3cyaXB2UnlHUjRUVTZjN1pld2ExUFhhenhIVnVEWk5na2FMUVhqYkpJSURfbGJHblh1UFZVODdNYWlVaEJZaW9wZllVVGpmVENQQnA5czhUYzZtUmZfTDZvUXNJbVY0LVZkdmpSX1dlaFE5VXYtVXRPcVFnQXAtd3NnSFBTUWNZdUhDaDF1SVVucHNZUEtmUTViakVmZnVaOGR1NVloYlZMWXRlMHdIX2hHRXpMRk56LVZySkNiNFVoVmhKM2hiclJoMExnIn19.2Y_jHIGmGOP8j3ddJu22DpYzooT_33SQ8RZdgoKlFDI'
            // })
            ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/synopsis/top3Things`, {
                headers: { Cookie: store.getState().credentials.cookie },
            })
                .map(response => fetchPatientTopThreeThingsSuccess({
                    userId: payload.userId,
                    topThreeThings: get(response, 'synopsis', []),
                }))
                .catch(error => Observable.of(fetchPatientTopThreeThingsFailure(error)))
        );

export const fetchPatientTopThreeThingsUpdateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_TOP_THREE_THINGS_UPDATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/top3Things`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .flatMap((response) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;

          return [
            fetchPatientTopThreeThingsSuccess({ userId, topThreeThings: response }),
            fetchPatientTopThreeThingsDetailRequest({ userId, sourceId }),
          ]
        })
        .catch(error => Observable.of(fetchPatientTopThreeThingsFailure(error)))
    );

export default function reducer(patientsTopThreeThings = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_TOP_THREE_THINGS_SUCCESS:
      return _.set(action.payload.userId, action.payload.topThreeThings, patientsTopThreeThings);
    default:
      return patientsTopThreeThings;
  }
}
