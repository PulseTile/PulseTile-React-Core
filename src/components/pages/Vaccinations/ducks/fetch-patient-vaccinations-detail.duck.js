import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_PATIENT_VACCINATIONS_DETAIL_REQUEST = 'FETCH_PATIENT_VACCINATIONS_DETAIL_REQUEST';
export const FETCH_PATIENT_VACCINATIONS_DETAIL_SUCCESS = 'FETCH_PATIENT_VACCINATIONS_DETAIL_SUCCESS';
export const FETCH_PATIENT_VACCINATIONS_DETAIL_FAILURE = 'FETCH_PATIENT_VACCINATIONS_DETAIL_FAILURE';

export const fetchPatientVaccinationsDetailRequest = createAction(FETCH_PATIENT_VACCINATIONS_DETAIL_REQUEST);
export const fetchPatientVaccinationsDetailSuccess = createAction(FETCH_PATIENT_VACCINATIONS_DETAIL_SUCCESS);
export const fetchPatientVaccinationsDetailFailure = createAction(FETCH_PATIENT_VACCINATIONS_DETAIL_FAILURE);

export const fetchPatientVaccinationsDetailEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_VACCINATIONS_DETAIL_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/vaccinations/${payload.sourceId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientVaccinationsDetailSuccess({
          userId: payload.userId,
          vaccinationsDetail: response,
        }))
        .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(vaccinationsDetail = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_VACCINATIONS_DETAIL_SUCCESS:
      return _.set(action.payload.userId, action.payload.vaccinationsDetail, vaccinationsDetail);
    default:
      return vaccinationsDetail;
  }
}