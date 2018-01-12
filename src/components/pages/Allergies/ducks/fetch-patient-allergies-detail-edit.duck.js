import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientAllergiesUpdateRequest } from './fetch-patient-allergies.duck'

export const FETCH_PATIENT_ALLERGIES_DETAIL_EDIT_REQUEST = 'FETCH_PATIENT_ALLERGIES_DETAIL_EDIT_REQUEST';
export const FETCH_PATIENT_ALLERGIES_DETAIL_EDIT_SUCCESS = 'FETCH_PATIENT_ALLERGIES_DETAIL_EDIT_SUCCESS';
export const FETCH_PATIENT_ALLERGIES_DETAIL_EDIT_FAILURE = 'FETCH_PATIENT_ALLERGIES_DETAIL_EDIT_FAILURE';

export const fetchPatientAllergiesDetailEditRequest = createAction(FETCH_PATIENT_ALLERGIES_DETAIL_EDIT_REQUEST);
export const fetchPatientAllergiesDetailEditSuccess = createAction(FETCH_PATIENT_ALLERGIES_DETAIL_EDIT_SUCCESS);
export const fetchPatientAllergiesDetailEditFailure = createAction(FETCH_PATIENT_ALLERGIES_DETAIL_EDIT_FAILURE);

export const fetchPatientAllergiesDetailEditEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_ALLERGIES_DETAIL_EDIT_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.put(`${usersUrls.PATIENTS_URL}/${payload.userId}/allergies/${payload.sourceId}`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;

          return [
            fetchPatientAllergiesDetailEditSuccess(response),
            fetchPatientAllergiesUpdateRequest({ userId, sourceId }),
          ];
        })
        .catch(error => Observable.of(fetchPatientAllergiesDetailEditFailure(error)))
    );

export default function reducer(allergiesDetailEdit = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_ALLERGIES_DETAIL_EDIT_SUCCESS:
      return action.payload;
    default:
      return allergiesDetailEdit;
  }
}
