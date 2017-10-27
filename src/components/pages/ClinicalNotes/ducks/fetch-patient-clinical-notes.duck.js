import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_PATIENT_CLINICAL_NOTES_REQUEST = 'FETCH_PATIENT_CLINICAL_NOTES_REQUEST';
export const FETCH_PATIENT_CLINICAL_NOTES_SUCCESS = 'FETCH_PATIENT_CLINICAL_NOTES_SUCCESS';
export const FETCH_PATIENT_CLINICAL_NOTES_FAILURE = 'FETCH_PATIENT_CLINICAL_NOTES_FAILURE';

export const fetchPatientClinicalNotesRequest = createAction(FETCH_PATIENT_CLINICAL_NOTES_REQUEST);
export const fetchPatientClinicalNotesSuccess = createAction(FETCH_PATIENT_CLINICAL_NOTES_SUCCESS);
export const fetchPatientClinicalNotesFailure = createAction(FETCH_PATIENT_CLINICAL_NOTES_FAILURE);

export const fetchPatientClinicalNotesEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_CLINICAL_NOTES_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/clinicalnotes`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientClinicalNotesSuccess({
          userId: payload.userId,
          clinicalNotes: response,
        }))
        .catch(error => Observable.of(fetchPatientClinicalNotesFailure(error)))
    );

export default function reducer(patientsClinicalNotes = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_CLINICAL_NOTES_SUCCESS:
      return _.set(action.payload.userId, action.payload.clinicalNotes, patientsClinicalNotes);
    default:
      return patientsClinicalNotes;
  }
}
