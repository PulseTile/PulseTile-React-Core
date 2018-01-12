import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientProceduresUpdateRequest } from './fetch-patient-procedures.duck'

export const FETCH_PATIENT_PROCEDURES_DETAIL_EDIT_REQUEST = 'FETCH_PATIENT_PROCEDURES_DETAIL_EDIT_REQUEST';
export const FETCH_PATIENT_PROCEDURES_DETAIL_EDIT_SUCCESS = 'FETCH_PATIENT_PROCEDURES_DETAIL_EDIT_SUCCESS';
export const FETCH_PATIENT_PROCEDURES_DETAIL_EDIT_FAILURE = 'FETCH_PATIENT_PROCEDURES_DETAIL_EDIT_FAILURE';

export const fetchPatientProceduresDetailEditRequest = createAction(FETCH_PATIENT_PROCEDURES_DETAIL_EDIT_REQUEST);
export const fetchPatientProceduresDetailEditSuccess = createAction(FETCH_PATIENT_PROCEDURES_DETAIL_EDIT_SUCCESS);
export const fetchPatientProceduresDetailEditFailure = createAction(FETCH_PATIENT_PROCEDURES_DETAIL_EDIT_FAILURE);

export const fetchPatientProceduresDetailEditEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_PROCEDURES_DETAIL_EDIT_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.put(`${usersUrls.PATIENTS_URL}/${payload.userId}/procedures/${payload.sourceId}`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;

          return [
            fetchPatientProceduresDetailEditSuccess(response),
            fetchPatientProceduresUpdateRequest({ userId, sourceId }),
          ];
        })
        .catch(error => Observable.of(fetchPatientProceduresDetailEditFailure(error)))
    );

export default function reducer(proceduresDetailEdit = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_PROCEDURES_DETAIL_EDIT_SUCCESS:
      return action.payload;
    default:
      return proceduresDetailEdit;
  }
}
