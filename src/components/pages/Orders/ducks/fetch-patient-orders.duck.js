import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_PATIENT_ORDERS_REQUEST = 'FETCH_PATIENT_ORDERS_REQUEST';
export const FETCH_PATIENT_ORDERS_SUCCESS = 'FETCH_PATIENT_ORDERS_SUCCESS';
export const FETCH_PATIENT_ORDERS_FAILURE = 'FETCH_PATIENT_ORDERS_FAILURE';

export const fetchPatientOrdersRequest = createAction(FETCH_PATIENT_ORDERS_REQUEST);
export const fetchPatientOrdersSuccess = createAction(FETCH_PATIENT_ORDERS_SUCCESS);
export const fetchPatientOrdersFailure = createAction(FETCH_PATIENT_ORDERS_FAILURE);

export const fetchPatientOrdersEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_ORDERS_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/laborders`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientOrdersSuccess({
          userId: payload.userId,
          orders: response,
        }))
        .catch(error => Observable.of(fetchPatientOrdersFailure(error)))
    );

export default function reducer(patientsOrders = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_ORDERS_SUCCESS:
      return _.set(action.payload.userId, action.payload.orders, patientsOrders);
    default:
      return patientsOrders;
  }
}
