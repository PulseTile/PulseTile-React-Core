import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_PATIENT_DRAWINGS_DETAIL_REQUEST = 'FETCH_PATIENT_DRAWINGS_DETAIL_REQUEST';
export const FETCH_PATIENT_DRAWINGS_DETAIL_SUCCESS = 'FETCH_PATIENT_DRAWINGS_DETAIL_SUCCESS';
export const FETCH_PATIENT_DRAWINGS_DETAIL_FAILURE = 'FETCH_PATIENT_DRAWINGS_DETAIL_FAILURE';

export const fetchPatientDrawingsDetailRequest = createAction(FETCH_PATIENT_DRAWINGS_DETAIL_REQUEST);
export const fetchPatientDrawingsDetailSuccess = createAction(FETCH_PATIENT_DRAWINGS_DETAIL_SUCCESS);
export const fetchPatientDrawingsDetailFailure = createAction(FETCH_PATIENT_DRAWINGS_DETAIL_FAILURE);

export const fetchPatientDrawingsDetailEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_DRAWINGS_DETAIL_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PICTURES}/${payload.userId}/${payload.sourceId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientDrawingsDetailSuccess({
          userId: payload.userId,
          drawingsDetail: response,
        }))
        // .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(drawingsDetail = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_DRAWINGS_DETAIL_SUCCESS:
      return _.set(action.payload.userId, action.payload.drawingsDetail, drawingsDetail);
    default:
      return drawingsDetail;
  }
}