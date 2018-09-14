import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientReferralsRequest } from './fetch-patient-referrals.duck'

export const FETCH_PATIENT_REFERRALS_CREATE_REQUEST = 'FETCH_PATIENT_REFERRALS_CREATE_REQUEST';
export const FETCH_PATIENT_REFERRALS_CREATE_SUCCESS = 'FETCH_PATIENT_REFERRALS_CREATE_SUCCESS';
export const FETCH_PATIENT_REFERRALS_CREATE_FAILURE = 'FETCH_PATIENT_REFERRALS_CREATE_FAILURE';

export const fetchPatientReferralsCreateRequest = createAction(FETCH_PATIENT_REFERRALS_CREATE_REQUEST);
export const fetchPatientReferralsCreateSuccess = createAction(FETCH_PATIENT_REFERRALS_CREATE_SUCCESS);
export const fetchPatientReferralsCreateFailure = createAction(FETCH_PATIENT_REFERRALS_CREATE_FAILURE);

export const fetchPatientReferralsCreateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_REFERRALS_CREATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.post(`${usersUrls.PATIENTS_URL}/${payload.userId}/referrals`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;

          return [
            fetchPatientReferralsCreateSuccess(response),
            fetchPatientReferralsRequest({ userId }),
          ];
        })
    );

export default function reducer(patientReferralsCreate = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_REFERRALS_CREATE_SUCCESS:
      return action.payload;
    default:
      return patientReferralsCreate
  }
}
