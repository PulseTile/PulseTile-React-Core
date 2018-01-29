import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_PATIENT_TRANSFERS_OF_CARE_DETAIL_REQUEST = 'FETCH_PATIENT_TRANSFERS_OF_CARE_DETAIL_REQUEST';
export const FETCH_PATIENT_TRANSFERS_OF_CARE_DETAIL_SUCCESS = 'FETCH_PATIENT_TRANSFERS_OF_CARE_DETAIL_SUCCESS';
export const FETCH_PATIENT_TRANSFERS_OF_CARE_DETAIL_FAILURE = 'FETCH_PATIENT_TRANSFERS_OF_CARE_DETAIL_FAILURE';

export const fetchPatientTransfersOfCareDetailRequest = createAction(FETCH_PATIENT_TRANSFERS_OF_CARE_DETAIL_REQUEST);
export const fetchPatientTransfersOfCareDetailSuccess = createAction(FETCH_PATIENT_TRANSFERS_OF_CARE_DETAIL_SUCCESS);
export const fetchPatientTransfersOfCareDetailFailure = createAction(FETCH_PATIENT_TRANSFERS_OF_CARE_DETAIL_FAILURE);

export const fetchPatientTransfersOfCareDetailEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_TRANSFERS_OF_CARE_DETAIL_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/events/toc/${payload.sourceId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientTransfersOfCareDetailSuccess({
          userId: payload.userId,
          transfersOfCareDetail: response,
        }))
        .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(transfersOfCareDetail = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_TRANSFERS_OF_CARE_DETAIL_SUCCESS:
      return _.set(action.payload.userId, action.payload.transfersOfCareDetail, transfersOfCareDetail);
    default:
      return transfersOfCareDetail;
  }
}