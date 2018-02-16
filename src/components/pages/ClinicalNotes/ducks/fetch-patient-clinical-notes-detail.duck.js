import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_PATIENT_CLINICAL_NOTES_DETAIL_REQUEST = 'FETCH_PATIENT_CLINICAL_NOTES_DETAIL_REQUEST';
export const FETCH_PATIENT_CLINICAL_NOTES_DETAIL_SUCCESS = 'FETCH_PATIENT_CLINICAL_NOTES_DETAIL_SUCCESS';
export const FETCH_PATIENT_CLINICAL_NOTES_DETAIL_FAILURE = 'FETCH_PATIENT_CLINICAL_NOTES_DETAIL_FAILURE';

export const fetchPatientClinicalNotesDetailRequest = createAction(FETCH_PATIENT_CLINICAL_NOTES_DETAIL_REQUEST);
export const fetchPatientClinicalNotesDetailSuccess = createAction(FETCH_PATIENT_CLINICAL_NOTES_DETAIL_SUCCESS);
export const fetchPatientClinicalNotesDetailFailure = createAction(FETCH_PATIENT_CLINICAL_NOTES_DETAIL_FAILURE);

export const fetchPatientClinicalNotesDetailEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_CLINICAL_NOTES_DETAIL_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/clinicalnotes/${payload.sourceId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientClinicalNotesDetailSuccess({
          userId: payload.userId,
          clinicalNotesDetail: response,
        }))
        // .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(clinicalNotesDetail = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_CLINICAL_NOTES_DETAIL_SUCCESS:
      return _.set(action.payload.userId, action.payload.clinicalNotesDetail, clinicalNotesDetail);
    default:
      return clinicalNotesDetail;
  }
}