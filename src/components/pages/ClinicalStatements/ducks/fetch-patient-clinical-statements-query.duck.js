import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';
import { handleErrors } from '../../../../ducks/handle-errors.duck';

export const FETCH_PATIENT_CLINICAL_STATEMENTS_QUERY_REQUEST = 'FETCH_PATIENT_CLINICAL_STATEMENTS_QUERY_REQUEST';
export const FETCH_PATIENT_CLINICAL_STATEMENTS_QUERY_SUCCESS = 'FETCH_PATIENT_CLINICAL_STATEMENTS_QUERY_SUCCESS';
export const FETCH_PATIENT_CLINICAL_STATEMENTS_QUERY_FAILURE = 'FETCH_PATIENT_CLINICAL_STATEMENTS_QUERY_FAILURE';

export const fetchPatientClinicalStatementsQueryRequest = createAction(FETCH_PATIENT_CLINICAL_STATEMENTS_QUERY_REQUEST);
export const fetchPatientClinicalStatementsQuerySuccess = createAction(FETCH_PATIENT_CLINICAL_STATEMENTS_QUERY_SUCCESS);
export const fetchPatientClinicalStatementsQueryFailure = createAction(FETCH_PATIENT_CLINICAL_STATEMENTS_QUERY_FAILURE);

export const fetchPatientClinicalStatementsQueryEpic = (action$, store) =>
	action$.ofType(FETCH_PATIENT_CLINICAL_STATEMENTS_QUERY_REQUEST)
		.mergeMap(({ payload }) => {
			let queryString = [];
			if (payload.tag) {    queryString.push('tag=' + encodeURIComponent(payload.tag)); }
			if (payload.prefix) { queryString.push('prefix=' + encodeURIComponent(payload.prefix));}

			return ajax.getJSON(`/api/contentStore/ts/phrases?${queryString.join('&')}`, {
					headers: { Cookie: store.getState().credentials.cookie },
				})
				.map(response => fetchPatientClinicalStatementsQuerySuccess({
					userId: payload.userId,
					clinicalStatementsQuery: response,
					tag: payload.tag
				}))
				.catch(error => Observable.of(handleErrors(error)))
		});


export default function reducer(patientsClinicalStatementsQuery = {}, action) {
	switch (action.type) {
		case FETCH_PATIENT_CLINICAL_STATEMENTS_QUERY_SUCCESS:
			return _.set(action.payload.tag, action.payload.clinicalStatementsQuery, patientsClinicalStatementsQuery);
		default:
			return patientsClinicalStatementsQuery;
	}
}
