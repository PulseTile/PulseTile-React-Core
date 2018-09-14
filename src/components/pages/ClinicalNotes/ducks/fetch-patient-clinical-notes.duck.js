import _ from 'lodash/fp';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientClinicalNotesDetailRequest } from './fetch-patient-clinical-notes-detail.duck';
import { hasTokenInResponse } from '../../../../utils/plugin-helpers.utils';

export const FETCH_PATIENT_CLINICAL_NOTES_REQUEST = 'FETCH_PATIENT_CLINICAL_NOTES_REQUEST';
export const FETCH_PATIENT_CLINICAL_NOTES_SUCCESS = 'FETCH_PATIENT_CLINICAL_NOTES_SUCCESS';
export const FETCH_PATIENT_CLINICAL_NOTES_FAILURE = 'FETCH_PATIENT_CLINICAL_NOTES_FAILURE';
export const FETCH_PATIENT_CLINICAL_NOTES_UPDATE_REQUEST = 'FETCH_PATIENT_CLINICAL_NOTES_UPDATE_REQUEST';

export const fetchPatientClinicalNotesRequest = createAction(FETCH_PATIENT_CLINICAL_NOTES_REQUEST);
export const fetchPatientClinicalNotesSuccess = createAction(FETCH_PATIENT_CLINICAL_NOTES_SUCCESS);
export const fetchPatientClinicalNotesFailure = createAction(FETCH_PATIENT_CLINICAL_NOTES_FAILURE);
export const fetchPatientClinicalNotesUpdateRequest = createAction(FETCH_PATIENT_CLINICAL_NOTES_UPDATE_REQUEST);

export const fetchPatientClinicalNotesEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_CLINICAL_NOTES_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/clinicalnotes`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map((response) => {
          const token = hasTokenInResponse(response);
          return fetchPatientClinicalNotesSuccess({
            userId: payload.userId,
            clinicalNotes: response,
            token,
          })
        })
    );

export const fetchPatientClinicalNotesUpdateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_CLINICAL_NOTES_UPDATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/clinicalnotes`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .flatMap((response) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;

          return [
            fetchPatientClinicalNotesSuccess({ userId, clinicalNotes: response }),
            fetchPatientClinicalNotesDetailRequest({ userId, sourceId }),
          ]
        })
        
    );

export default function reducer(patientsClinicalNotes = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_CLINICAL_NOTES_SUCCESS:
      return _.set(action.payload.userId, action.payload.clinicalNotes, patientsClinicalNotes);
    default:
      return patientsClinicalNotes;
  }
}
