import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_PATIENT_CLINICAL_NOTES_DETAIL_EDIT_REQUEST = 'FETCH_PATIENT_CLINICAL_NOTES_DETAIL_EDIT_REQUEST';
export const FETCH_PATIENT_CLINICAL_NOTES_DETAIL_EDIT_SUCCESS = 'FETCH_PATIENT_CLINICAL_NOTES_DETAIL_EDIT_SUCCESS';
export const FETCH_PATIENT_CLINICAL_NOTES_DETAIL_EDIT_FAILURE = 'FETCH_PATIENT_CLINICAL_NOTES_DETAIL_EDIT_FAILURE';

export const fetchPatientClinicalNotesDetailEditRequest = createAction(FETCH_PATIENT_CLINICAL_NOTES_DETAIL_EDIT_REQUEST);
export const fetchPatientClinicalNotesDetailEditSuccess = createAction(FETCH_PATIENT_CLINICAL_NOTES_DETAIL_EDIT_SUCCESS);
export const fetchPatientClinicalNotesDetailEditFailure = createAction(FETCH_PATIENT_CLINICAL_NOTES_DETAIL_EDIT_FAILURE);

export const fetchPatientDiagnosesDetailEditEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_CLINICAL_NOTES_DETAIL_EDIT_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.put(`${usersUrls.PATIENTS_URL}/${payload.userId}/clinicalnotes`, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .map(({ response }) => fetchPatientClinicalNotesDetailEditSuccess(response))
        .catch(error => Observable.of(fetchPatientClinicalNotesDetailEditFailure(error)))
    );

export default function reducer(clinicalNotesDetailEdit = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_CLINICAL_NOTES_DETAIL_EDIT_SUCCESS:
      return action.payload;
    default:
      return clinicalNotesDetailEdit;
  }
}