import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientMDTsRequest } from './fetch-patient-mdts.duck'

export const FETCH_PATIENT_MDTS_CREATE_REQUEST = 'FETCH_PATIENT_MDTS_CREATE_REQUEST';
export const FETCH_PATIENT_MDTS_CREATE_SUCCESS = 'FETCH_PATIENT_MDTS_CREATE_SUCCESS';
export const FETCH_PATIENT_MDTS_CREATE_FAILURE = 'FETCH_PATIENT_MDTS_CREATE_FAILURE';

export const fetchPatientMDTsCreateRequest = createAction(FETCH_PATIENT_MDTS_CREATE_REQUEST);
export const fetchPatientMDTsCreateSuccess = createAction(FETCH_PATIENT_MDTS_CREATE_SUCCESS);
export const fetchPatientMDTsCreateFailure = createAction(FETCH_PATIENT_MDTS_CREATE_FAILURE);

export const fetchPatientMDTsCreateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_MDTS_CREATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.post(`${usersUrls.PATIENTS_URL}/${payload.userId}/mdtreports`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;

          return [
            fetchPatientMDTsCreateSuccess(response),
            fetchPatientMDTsRequest({ userId }),
          ];
        })
        .catch(error => Observable.of(fetchPatientMDTsCreateFailure(error)))
    );

export default function reducer(patientMDTsCreate = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_MDTS_CREATE_SUCCESS:
      return action.payload;
    default:
      return patientMDTsCreate
  }
}
