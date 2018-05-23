import _ from 'lodash/fp';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_PATIENT_MEDICATIONS_DETAIL_REQUEST = 'FETCH_PATIENT_MEDICATIONS_DETAIL_REQUEST';
export const FETCH_PATIENT_MEDICATIONS_DETAIL_SUCCESS = 'FETCH_PATIENT_MEDICATIONS_DETAIL_SUCCESS';
export const FETCH_PATIENT_MEDICATIONS_DETAIL_FAILURE = 'FETCH_PATIENT_MEDICATIONS_DETAIL_FAILURE';

export const fetchPatientMedicationsDetailRequest = createAction(FETCH_PATIENT_MEDICATIONS_DETAIL_REQUEST);
export const fetchPatientMedicationsDetailSuccess = createAction(FETCH_PATIENT_MEDICATIONS_DETAIL_SUCCESS);
export const fetchPatientMedicationsDetailFailure = createAction(FETCH_PATIENT_MEDICATIONS_DETAIL_FAILURE);

export const fetchPatientMedicationsDetailEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_MEDICATIONS_DETAIL_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/medications/${payload.sourceId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientMedicationsDetailSuccess({
          userId: payload.userId,
          medicationsDetail: response,
          token: response.token,
        }))
    );

export default function reducer(medicationsDetail = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_MEDICATIONS_DETAIL_SUCCESS:
      return _.set(action.payload.userId, action.payload.medicationsDetail, medicationsDetail);
    default:
      return medicationsDetail;
  }
}