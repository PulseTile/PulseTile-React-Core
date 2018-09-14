import _ from 'lodash/fp';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientProceduresDetailRequest } from './fetch-patient-procedures-detail.duck';
import { hasTokenInResponse } from '../../../../utils/plugin-helpers.utils';

export const FETCH_PATIENT_PROCEDURES_REQUEST = 'FETCH_PATIENT_PROCEDURES_REQUEST';
export const FETCH_PATIENT_PROCEDURES_SUCCESS = 'FETCH_PATIENT_PROCEDURES_SUCCESS';
export const FETCH_PATIENT_PROCEDURES_FAILURE = 'FETCH_PATIENT_PROCEDURES_FAILURE';
export const FETCH_PATIENT_PROCEDURES_UPDATE_REQUEST = 'FETCH_PATIENT_PROCEDURES_UPDATE_REQUEST';

export const fetchPatientProceduresRequest = createAction(FETCH_PATIENT_PROCEDURES_REQUEST);
export const fetchPatientProceduresSuccess = createAction(FETCH_PATIENT_PROCEDURES_SUCCESS);
export const fetchPatientProceduresFailure = createAction(FETCH_PATIENT_PROCEDURES_FAILURE);
export const fetchPatientProceduresUpdateRequest = createAction(FETCH_PATIENT_PROCEDURES_UPDATE_REQUEST);

export const fetchPatientProceduresEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_PROCEDURES_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/procedures`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map((response) => {
          const token = hasTokenInResponse(response);
          return fetchPatientProceduresSuccess({
            userId: payload.userId,
            procedures: response,
            token,
          })
        })
    );

export const fetchPatientProceduresUpdateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_PROCEDURES_UPDATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/procedures`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .flatMap((response) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;

          return [
            fetchPatientProceduresSuccess({ userId, procedures: response }),
            fetchPatientProceduresDetailRequest({ userId, sourceId }),
          ]
        })
        
    );

export default function reducer(patientsProcedures = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_PROCEDURES_SUCCESS:
      return _.set(action.payload.userId, action.payload.procedures, patientsProcedures);
    default:
      return patientsProcedures;
  }
}
