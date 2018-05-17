import _ from 'lodash/fp';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientReferralsDetailRequest } from './fetch-patient-referrals-detail.duck';
import { hasTokenInResponse } from '../../../../utils/plugin-helpers.utils';

export const FETCH_PATIENT_REFERRALS_REQUEST = 'FETCH_PATIENT_REFERRALS_REQUEST';
export const FETCH_PATIENT_REFERRALS_SUCCESS = 'FETCH_PATIENT_REFERRALS_SUCCESS';
export const FETCH_PATIENT_REFERRALS_FAILURE = 'FETCH_PATIENT_REFERRALS_FAILURE';
export const FETCH_PATIENT_REFERRALS_UPDATE_REQUEST = 'FETCH_PATIENT_REFERRALS_UPDATE_REQUEST';

export const fetchPatientReferralsRequest = createAction(FETCH_PATIENT_REFERRALS_REQUEST);
export const fetchPatientReferralsSuccess = createAction(FETCH_PATIENT_REFERRALS_SUCCESS);
export const fetchPatientReferralsFailure = createAction(FETCH_PATIENT_REFERRALS_FAILURE);
export const fetchPatientReferralsUpdateRequest = createAction(FETCH_PATIENT_REFERRALS_UPDATE_REQUEST);

export const fetchPatientReferralsEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_REFERRALS_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/referrals`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map((response) => {
          const token = hasTokenInResponse(response);
          return fetchPatientReferralsSuccess({
            userId: payload.userId,
            referrals: response,
            token,
          })
        })
    );

export const fetchPatientReferralsUpdateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_REFERRALS_UPDATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/referrals`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .flatMap((response) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;

          return [
            fetchPatientReferralsSuccess({ userId, referrals: response }),
            fetchPatientReferralsDetailRequest({ userId, sourceId }),
          ]
        })
        
    );

export default function reducer(patientsReferrals = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_REFERRALS_SUCCESS:
      return _.set(action.payload.userId, action.payload.referrals, patientsReferrals);
    default:
      return patientsReferrals;
  }
}
