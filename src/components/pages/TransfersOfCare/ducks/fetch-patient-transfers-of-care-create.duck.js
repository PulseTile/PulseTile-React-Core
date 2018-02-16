import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientTransfersOfCareRequest } from './fetch-patient-transfers-of-care.duck'
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_PATIENT_TRANSFERS_OF_CARE_CREATE_REQUEST = 'FETCH_PATIENT_TRANSFERS_OF_CARE_CREATE_REQUEST';
export const FETCH_PATIENT_TRANSFERS_OF_CARE_CREATE_SUCCESS = 'FETCH_PATIENT_TRANSFERS_OF_CARE_CREATE_SUCCESS';
export const FETCH_PATIENT_TRANSFERS_OF_CARE_CREATE_FAILURE = 'FETCH_PATIENT_TRANSFERS_OF_CARE_CREATE_FAILURE';

export const fetchPatientTransfersOfCareCreateRequest = createAction(FETCH_PATIENT_TRANSFERS_OF_CARE_CREATE_REQUEST);
export const fetchPatientTransfersOfCareCreateSuccess = createAction(FETCH_PATIENT_TRANSFERS_OF_CARE_CREATE_SUCCESS);
export const fetchPatientTransfersOfCareCreateFailure = createAction(FETCH_PATIENT_TRANSFERS_OF_CARE_CREATE_FAILURE);

export const fetchPatientTransfersOfCareCreateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_TRANSFERS_OF_CARE_CREATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.post(`${usersUrls.PATIENTS_URL}/${payload.userId}/events/toc`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;

          return [
            fetchPatientTransfersOfCareCreateSuccess(response),
            fetchPatientTransfersOfCareRequest({ userId }),
          ];
        })
        // // .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(patientTransfersOfCareCreate = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_TRANSFERS_OF_CARE_CREATE_SUCCESS:
      return action.payload;
    default:
      return patientTransfersOfCareCreate
  }
}
