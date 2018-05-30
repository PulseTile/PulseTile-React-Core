import _ from 'lodash/fp';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { hasTokenInResponse } from '../../../../utils/plugin-helpers.utils';

export const FETCH_PATIENT_CLINICAL_STATEMENTS_REQUEST = 'FETCH_PATIENT_CLINICAL_STATEMENTS_REQUEST';
export const FETCH_PATIENT_CLINICAL_STATEMENTS_SUCCESS = 'FETCH_PATIENT_CLINICAL_STATEMENTS_SUCCESS';
export const FETCH_PATIENT_CLINICAL_STATEMENTS_FAILURE = 'FETCH_PATIENT_CLINICAL_STATEMENTS_FAILURE';

export const fetchPatientClinicalStatementsRequest = createAction(FETCH_PATIENT_CLINICAL_STATEMENTS_REQUEST);
export const fetchPatientClinicalStatementsSuccess = createAction(FETCH_PATIENT_CLINICAL_STATEMENTS_SUCCESS);
export const fetchPatientClinicalStatementsFailure = createAction(FETCH_PATIENT_CLINICAL_STATEMENTS_FAILURE);

export const fetchPatientClinicalStatementsEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_CLINICAL_STATEMENTS_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/clinicalStatements`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map((response) => {
          const token = hasTokenInResponse(response);
          return fetchPatientClinicalStatementsSuccess({
            userId: payload.userId,
            clinicalStatements: response,
            token,
          })
        })
    );

export default function reducer(patientsClinicalStatements = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_CLINICAL_STATEMENTS_SUCCESS:
      return _.set(action.payload.userId, action.payload.clinicalStatements, patientsClinicalStatements);
    default:
      return patientsClinicalStatements;
  }
}
