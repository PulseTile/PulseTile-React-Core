import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_PATIENT_CLINICAL_STATEMENTS_DETAIL_REQUEST = 'FETCH_PATIENT_CLINICAL_STATEMENTS_DETAIL_REQUEST';
export const FETCH_PATIENT_CLINICAL_STATEMENTS_DETAIL_SUCCESS = 'FETCH_PATIENT_CLINICAL_STATEMENTS_DETAIL_SUCCESS';
export const FETCH_PATIENT_CLINICAL_STATEMENTS_DETAIL_FAILURE = 'FETCH_PATIENT_CLINICAL_STATEMENTS_DETAIL_FAILURE';

export const fetchPatientClinicalStatementsDetailRequest = createAction(FETCH_PATIENT_CLINICAL_STATEMENTS_DETAIL_REQUEST);
export const fetchPatientClinicalStatementsDetailSuccess = createAction(FETCH_PATIENT_CLINICAL_STATEMENTS_DETAIL_SUCCESS);
export const fetchPatientClinicalStatementsDetailFailure = createAction(FETCH_PATIENT_CLINICAL_STATEMENTS_DETAIL_FAILURE);

export const fetchPatientClinicalStatementsDetailEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_CLINICAL_STATEMENTS_DETAIL_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/clinicalStatements/${payload.sourceId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientClinicalStatementsDetailSuccess({
          userId: payload.userId,
          clinicalStatementsDetail: response,
        }))
        .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(clinicalStatementsDetail = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_CLINICAL_STATEMENTS_DETAIL_SUCCESS:
      return _.set(action.payload.userId, action.payload.clinicalStatementsDetail, clinicalStatementsDetail);
    default:
      return clinicalStatementsDetail;
  }
}