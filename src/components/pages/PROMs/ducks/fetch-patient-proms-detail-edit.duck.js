import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientPromsUpdateRequest } from './fetch-patient-proms.duck'

export const FETCH_PATIENT_PROMS_DETAIL_EDIT_REQUEST = 'FETCH_PATIENT_PROMS_DETAIL_EDIT_REQUEST';
export const FETCH_PATIENT_PROMS_DETAIL_EDIT_SUCCESS = 'FETCH_PATIENT_PROMS_DETAIL_EDIT_SUCCESS';
export const FETCH_PATIENT_PROMS_DETAIL_EDIT_FAILURE = 'FETCH_PATIENT_PROMS_DETAIL_EDIT_FAILURE';

export const fetchPatientPromsDetailEditRequest = createAction(FETCH_PATIENT_PROMS_DETAIL_EDIT_REQUEST);
export const fetchPatientPromsDetailEditSuccess = createAction(FETCH_PATIENT_PROMS_DETAIL_EDIT_SUCCESS);
export const fetchPatientPromsDetailEditFailure = createAction(FETCH_PATIENT_PROMS_DETAIL_EDIT_FAILURE);

export const fetchPatientPromsDetailEditEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_PROMS_DETAIL_EDIT_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.put(`${usersUrls.PATIENTS_URL}/${payload.userId}/proms/${payload.sourceId}`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;

          return [
            fetchPatientPromsDetailEditSuccess(response),
            fetchPatientPromsUpdateRequest({ userId, sourceId }),
          ];
        })
    );

export default function reducer(promsDetailEdit = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_PROMS_DETAIL_EDIT_SUCCESS:
      return action.payload;
    default:
      return promsDetailEdit;
  }
}
