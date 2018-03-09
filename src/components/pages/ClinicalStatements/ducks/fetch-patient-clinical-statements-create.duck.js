import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientClinicalStatementsRequest } from './fetch-patient-clinical-statements.duck'

export const FETCH_PATIENT_CLINICAL_STATEMENTS_CREATE_REQUEST = 'FETCH_PATIENT_CLINICAL_STATEMENTS_CREATE_REQUEST';
export const FETCH_PATIENT_CLINICAL_STATEMENTS_CREATE_SUCCESS = 'FETCH_PATIENT_CLINICAL_STATEMENTS_CREATE_SUCCESS';
export const FETCH_PATIENT_CLINICAL_STATEMENTS_CREATE_FAILURE = 'FETCH_PATIENT_CLINICAL_STATEMENTS_CREATE_FAILURE';

export const fetchPatientClinicalStatementsCreateRequest = createAction(FETCH_PATIENT_CLINICAL_STATEMENTS_CREATE_REQUEST);
export const fetchPatientClinicalStatementsCreateSuccess = createAction(FETCH_PATIENT_CLINICAL_STATEMENTS_CREATE_SUCCESS);
export const fetchPatientClinicalStatementsCreateFailure = createAction(FETCH_PATIENT_CLINICAL_STATEMENTS_CREATE_FAILURE);

export const fetchPatientClinicalStatementsCreateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_CLINICAL_STATEMENTS_CREATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.post(`${usersUrls.PATIENTS_URL}/${payload.userId}/clinicalStatements`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;

          return [
            fetchPatientClinicalStatementsCreateSuccess(response),
            fetchPatientClinicalStatementsRequest({ userId }),
          ];
        })
    );

export default function reducer(patientClinicalStatementsCreate = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_CLINICAL_STATEMENTS_CREATE_SUCCESS:
      return action.payload;
    default:
      return patientClinicalStatementsCreate
  }
}
