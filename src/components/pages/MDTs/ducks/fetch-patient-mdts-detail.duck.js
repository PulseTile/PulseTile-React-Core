import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_PATIENT_MDTS_DETAIL_REQUEST = 'FETCH_PATIENT_MDTS_DETAIL_REQUEST';
export const FETCH_PATIENT_MDTS_DETAIL_SUCCESS = 'FETCH_PATIENT_MDTS_DETAIL_SUCCESS';
export const FETCH_PATIENT_MDTS_DETAIL_FAILURE = 'FETCH_PATIENT_MDTS_DETAIL_FAILURE';

export const fetchPatientMDTsDetailRequest = createAction(FETCH_PATIENT_MDTS_DETAIL_REQUEST);
export const fetchPatientMDTsDetailSuccess = createAction(FETCH_PATIENT_MDTS_DETAIL_SUCCESS);
export const fetchPatientMDTsDetailFailure = createAction(FETCH_PATIENT_MDTS_DETAIL_FAILURE);

export const fetchPatientMDTsDetailEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_MDTS_DETAIL_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/mdtreports/${payload.sourceId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientMDTsDetailSuccess({
          userId: payload.userId,
          mdtsDetail: response,
        }))
        // .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(mdtsDetail = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_MDTS_DETAIL_SUCCESS:
      return _.set(action.payload.userId, action.payload.mdtsDetail, mdtsDetail);
    default:
      return mdtsDetail;
  }
}