import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_PATIENT_ORDERS_DETAIL_REQUEST = 'FETCH_PATIENT_ORDERS_DETAIL_REQUEST';
export const FETCH_PATIENT_ORDERS_DETAIL_SUCCESS = 'FETCH_PATIENT_ORDERS_DETAIL_SUCCESS';
export const FETCH_PATIENT_ORDERS_DETAIL_FAILURE = 'FETCH_PATIENT_ORDERS_DETAIL_FAILURE';

export const fetchPatientOrdersDetailRequest = createAction(FETCH_PATIENT_ORDERS_DETAIL_REQUEST);
export const fetchPatientOrdersDetailSuccess = createAction(FETCH_PATIENT_ORDERS_DETAIL_SUCCESS);
export const fetchPatientOrdersDetailFailure = createAction(FETCH_PATIENT_ORDERS_DETAIL_FAILURE);

export const fetchPatientOrdersDetailEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_ORDERS_DETAIL_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/laborders/${payload.sourceId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientOrdersDetailSuccess({
          userId: payload.userId,
          ordersDetail: response,
        }))
        .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(ordersDetail = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_ORDERS_DETAIL_SUCCESS:
      return _.set(action.payload.userId, action.payload.ordersDetail, ordersDetail);
    default:
      return ordersDetail;
  }
}