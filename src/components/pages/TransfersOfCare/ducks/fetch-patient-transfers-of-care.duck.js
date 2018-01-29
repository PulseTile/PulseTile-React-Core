import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientTransfersOfCareDetailRequest } from './fetch-patient-transfers-of-care-detail.duck';

export const FETCH_PATIENT_TRANSFERS_OF_CARE_REQUEST = 'FETCH_PATIENT_TRANSFERS_OF_CARE_REQUEST';
export const FETCH_PATIENT_TRANSFERS_OF_CARE_SUCCESS = 'FETCH_PATIENT_TRANSFERS_OF_CARE_SUCCESS';
export const FETCH_PATIENT_TRANSFERS_OF_CARE_FAILURE = 'FETCH_PATIENT_TRANSFERS_OF_CARE_FAILURE';
export const FETCH_PATIENT_TRANSFERS_OF_CARE_UPDATE_REQUEST = 'FETCH_PATIENT_TRANSFERS_OF_CARE_UPDATE_REQUEST';

export const fetchPatientTransfersOfCareRequest = createAction(FETCH_PATIENT_TRANSFERS_OF_CARE_REQUEST);
export const fetchPatientTransfersOfCareSuccess = createAction(FETCH_PATIENT_TRANSFERS_OF_CARE_SUCCESS);
export const fetchPatientTransfersOfCareFailure = createAction(FETCH_PATIENT_TRANSFERS_OF_CARE_FAILURE);
export const fetchPatientTransfersOfCareUpdateRequest = createAction(FETCH_PATIENT_TRANSFERS_OF_CARE_UPDATE_REQUEST);

export const fetchPatientTransfersOfCareEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_TRANSFERS_OF_CARE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/events/toc`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientTransfersOfCareSuccess({
          userId: payload.userId,
          transfersOfCare: response,
        }))
        .catch(error => Observable.of(fetchPatientTransfersOfCareFailure(error)))
    );

export const fetchPatientTransfersOfCareUpdateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_TRANSFERS_OF_CARE_UPDATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/events/toc`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .flatMap((response) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;

          return [
            fetchPatientTransfersOfCareSuccess({ userId, transfersOfCare: response }),
            fetchPatientTransfersOfCareDetailRequest({ userId, sourceId }),
          ]
        })
        .catch(error => Observable.of(fetchPatientTransfersOfCareFailure(error)))
    );

export default function reducer(patientsTransfersOfCare = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_TRANSFERS_OF_CARE_SUCCESS:
      return _.set(action.payload.userId, action.payload.transfersOfCare, patientsTransfersOfCare);
    default:
      return patientsTransfersOfCare;
  }
}
