import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientVitalsUpdateRequest } from './fetch-patient-vitals.duck'

export const FETCH_PATIENT_VITALS_DETAIL_EDIT_REQUEST = 'FETCH_PATIENT_VITALS_DETAIL_EDIT_REQUEST';
export const FETCH_PATIENT_VITALS_DETAIL_EDIT_SUCCESS = 'FETCH_PATIENT_VITALS_DETAIL_EDIT_SUCCESS';
export const FETCH_PATIENT_VITALS_DETAIL_EDIT_FAILURE = 'FETCH_PATIENT_VITALS_DETAIL_EDIT_FAILURE';

export const fetchPatientVitalsDetailEditRequest = createAction(FETCH_PATIENT_VITALS_DETAIL_EDIT_REQUEST);
export const fetchPatientVitalsDetailEditSuccess = createAction(FETCH_PATIENT_VITALS_DETAIL_EDIT_SUCCESS);
export const fetchPatientVitalsDetailEditFailure = createAction(FETCH_PATIENT_VITALS_DETAIL_EDIT_FAILURE);

export const fetchPatientVitalsDetailEditEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_VITALS_DETAIL_EDIT_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.put(`${usersUrls.PATIENTS_URL}/${payload.userId}/vitalsigns/${payload.sourceId}`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;

          return [
            fetchPatientVitalsDetailEditSuccess(response),
            fetchPatientVitalsUpdateRequest({ userId, sourceId }),
          ];
        })
    );

export default function reducer(vitalsDetailEdit = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_VITALS_DETAIL_EDIT_SUCCESS:
      return action.payload;
    default:
      return vitalsDetailEdit;
  }
}
