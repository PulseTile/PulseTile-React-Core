import _ from 'lodash/fp';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

export const FETCH_PATIENT_CLINICAL_STATEMENTS_TAGS_REQUEST = 'FETCH_PATIENT_CLINICAL_STATEMENTS_TAGS_REQUEST';
export const FETCH_PATIENT_CLINICAL_STATEMENTS_TAGS_SUCCESS = 'FETCH_PATIENT_CLINICAL_STATEMENTS_TAGS_SUCCESS';
export const FETCH_PATIENT_CLINICAL_STATEMENTS_TAGS_FAILURE = 'FETCH_PATIENT_CLINICAL_STATEMENTS_TAGS_FAILURE';

export const fetchPatientClinicalStatementsTagsRequest = createAction(FETCH_PATIENT_CLINICAL_STATEMENTS_TAGS_REQUEST);
export const fetchPatientClinicalStatementsTagsSuccess = createAction(FETCH_PATIENT_CLINICAL_STATEMENTS_TAGS_SUCCESS);
export const fetchPatientClinicalStatementsTagsFailure = createAction(FETCH_PATIENT_CLINICAL_STATEMENTS_TAGS_FAILURE);

export const fetchPatientClinicalStatementsTagsEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_CLINICAL_STATEMENTS_TAGS_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON('api/contentStore/ts/tags', {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientClinicalStatementsTagsSuccess({
          userId: payload.userId,
          clinicalStatementsTags: response,
        }))
    );


export default function reducer(patientsClinicalStatementsTags = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_CLINICAL_STATEMENTS_TAGS_SUCCESS:
      return _.set(action.payload.userId, action.payload.clinicalStatementsTags, patientsClinicalStatementsTags);
    default:
      return patientsClinicalStatementsTags;
  }
}
