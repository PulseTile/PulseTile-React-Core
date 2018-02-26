import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_PATIENT_REFERRALS_DETAIL_REQUEST = 'FETCH_PATIENT_REFERRALS_DETAIL_REQUEST';
export const FETCH_PATIENT_REFERRALS_DETAIL_SUCCESS = 'FETCH_PATIENT_REFERRALS_DETAIL_SUCCESS';
export const FETCH_PATIENT_REFERRALS_DETAIL_FAILURE = 'FETCH_PATIENT_REFERRALS_DETAIL_FAILURE';

export const fetchPatientReferralsDetailRequest = createAction(FETCH_PATIENT_REFERRALS_DETAIL_REQUEST);
export const fetchPatientReferralsDetailSuccess = createAction(FETCH_PATIENT_REFERRALS_DETAIL_SUCCESS);
export const fetchPatientReferralsDetailFailure = createAction(FETCH_PATIENT_REFERRALS_DETAIL_FAILURE);

export const fetchPatientReferralsDetailEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_REFERRALS_DETAIL_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/referrals/${payload.sourceId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientReferralsDetailSuccess({
          userId: payload.userId,
          referralsDetail: response,
        }))
        // .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(referralsDetail = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_REFERRALS_DETAIL_SUCCESS:
      return _.set(action.payload.userId, action.payload.referralsDetail, referralsDetail);
    default:
      return referralsDetail;
  }
}