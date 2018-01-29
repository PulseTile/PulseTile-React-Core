import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';
import _ from 'lodash/fp'

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientOrdersRequest } from './fetch-patient-orders.duck'
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_PATIENT_ORDERS_CREATE_REQUEST = 'FETCH_PATIENT_ORDERS_CREATE_REQUEST';
export const FETCH_PATIENT_ORDERS_CREATE_SUCCESS = 'FETCH_PATIENT_ORDERS_CREATE_SUCCESS';
export const FETCH_PATIENT_ORDERS_CREATE_FAILURE = 'FETCH_PATIENT_ORDERS_CREATE_FAILURE';

export const fetchPatientOrdersCreateRequest = createAction(FETCH_PATIENT_ORDERS_CREATE_REQUEST);
export const fetchPatientOrdersCreateSuccess = createAction(FETCH_PATIENT_ORDERS_CREATE_SUCCESS);
export const fetchPatientOrdersCreateFailure = createAction(FETCH_PATIENT_ORDERS_CREATE_FAILURE);

export const fetchPatientOrdersCreateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_ORDERS_CREATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.post(`${usersUrls.PATIENTS_URL}/${_.last(payload)}/laborders`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = _.last(payload);

          return [
            fetchPatientOrdersCreateSuccess(response),
            fetchPatientOrdersRequest({ userId }),
          ];
        })
        .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(patientOrdersCreate = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_ORDERS_CREATE_SUCCESS:
      return action.payload;
    default:
      return patientOrdersCreate
  }
}
