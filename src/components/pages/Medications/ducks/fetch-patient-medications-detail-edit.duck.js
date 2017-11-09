import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_PATIENT_MEDICATIONS_DETAIL_EDIT_REQUEST = 'FETCH_PATIENT_MEDICATIONS_DETAIL_EDIT_REQUEST';
export const FETCH_PATIENT_MEDICATIONS_DETAIL_EDIT_SUCCESS = 'FETCH_PATIENT_MEDICATIONS_DETAIL_EDIT_SUCCESS';
export const FETCH_PATIENT_MEDICATIONS_DETAIL_EDIT_FAILURE = 'FETCH_PATIENT_MEDICATIONS_DETAIL_EDIT_FAILURE';

export const fetchPatientMedicationsDetailEditRequest = createAction(FETCH_PATIENT_MEDICATIONS_DETAIL_EDIT_REQUEST);
export const fetchPatientMedicationsDetailEditSuccess = createAction(FETCH_PATIENT_MEDICATIONS_DETAIL_EDIT_SUCCESS);
export const fetchPatientMedicationsDetailEditFailure = createAction(FETCH_PATIENT_MEDICATIONS_DETAIL_EDIT_FAILURE);

export const fetchPatientMedicationsDetailEditEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_MEDICATIONS_DETAIL_EDIT_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.put(`${usersUrls.PATIENTS_URL}/${payload.userId}/medications/${payload.sourceId}`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .map(({ response }) => fetchPatientMedicationsDetailEditSuccess(response))
        .catch(error => Observable.of(fetchPatientMedicationsDetailEditFailure(error)))
    );

export default function reducer(medicationsDetailEdit = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_MEDICATIONS_DETAIL_EDIT_SUCCESS:
      return action.payload;
    default:
      return medicationsDetailEdit;
  }
}