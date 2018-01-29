import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_PATIENT_VITALS_DETAIL_REQUEST = 'FETCH_PATIENT_VITALS_DETAIL_REQUEST';
export const FETCH_PATIENT_VITALS_DETAIL_SUCCESS = 'FETCH_PATIENT_VITALS_DETAIL_SUCCESS';
export const FETCH_PATIENT_VITALS_DETAIL_FAILURE = 'FETCH_PATIENT_VITALS_DETAIL_FAILURE';

export const fetchPatientVitalsDetailRequest = createAction(FETCH_PATIENT_VITALS_DETAIL_REQUEST);
export const fetchPatientVitalsDetailSuccess = createAction(FETCH_PATIENT_VITALS_DETAIL_SUCCESS);
export const fetchPatientVitalsDetailFailure = createAction(FETCH_PATIENT_VITALS_DETAIL_FAILURE);

export const fetchPatientVitalsDetailEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_VITALS_DETAIL_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/vitalsigns/${payload.sourceId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientVitalsDetailSuccess({
          userId: payload.userId,
          vitalsDetail: response,
        }))
        .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(vitalsDetail = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_VITALS_DETAIL_SUCCESS:
      return _.set(action.payload.userId, action.payload.vitalsDetail, vitalsDetail);
    default:
      return vitalsDetail;
  }
}