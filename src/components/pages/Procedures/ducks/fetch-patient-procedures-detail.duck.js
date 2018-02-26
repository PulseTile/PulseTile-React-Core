import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_PATIENT_PROCEDURES_DETAIL_REQUEST = 'FETCH_PATIENT_PROCEDURES_DETAIL_REQUEST';
export const FETCH_PATIENT_PROCEDURES_DETAIL_SUCCESS = 'FETCH_PATIENT_PROCEDURES_DETAIL_SUCCESS';
export const FETCH_PATIENT_PROCEDURES_DETAIL_FAILURE = 'FETCH_PATIENT_PROCEDURES_DETAIL_FAILURE';

export const fetchPatientProceduresDetailRequest = createAction(FETCH_PATIENT_PROCEDURES_DETAIL_REQUEST);
export const fetchPatientProceduresDetailSuccess = createAction(FETCH_PATIENT_PROCEDURES_DETAIL_SUCCESS);
export const fetchPatientProceduresDetailFailure = createAction(FETCH_PATIENT_PROCEDURES_DETAIL_FAILURE);

export const fetchPatientProceduresDetailEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_PROCEDURES_DETAIL_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/procedures/${payload.sourceId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientProceduresDetailSuccess({
          userId: payload.userId,
          proceduresDetail: response,
        }))
        // .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(proceduresDetail = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_PROCEDURES_DETAIL_SUCCESS:
      return _.set(action.payload.userId, action.payload.proceduresDetail, proceduresDetail);
    default:
      return proceduresDetail;
  }
}