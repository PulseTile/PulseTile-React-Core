import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_PATIENT_PROCEDURES_REQUEST = 'FETCH_PATIENT_PROCEDURES_REQUEST';
export const FETCH_PATIENT_PROCEDURES_SUCCESS = 'FETCH_PATIENT_PROCEDURES_SUCCESS';
export const FETCH_PATIENT_PROCEDURES_FAILURE = 'FETCH_PATIENT_PROCEDURES_FAILURE';

export const fetchPatientProceduresRequest = createAction(FETCH_PATIENT_PROCEDURES_REQUEST);
export const fetchPatientProceduresSuccess = createAction(FETCH_PATIENT_PROCEDURES_SUCCESS);
export const fetchPatientProceduresFailure = createAction(FETCH_PATIENT_PROCEDURES_FAILURE);

export const fetchPatientProceduresEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_PROCEDURES_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/procedures`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientProceduresSuccess({
          userId: payload.userId,
          procedures: response,
        }))
        .catch(error => Observable.of(fetchPatientProceduresFailure(error)))
    );

export default function reducer(patientsProcedures = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_PROCEDURES_SUCCESS:
      return _.set(action.payload.userId, action.payload.procedures, patientsProcedures);
    default:
      return patientsProcedures;
  }
}
