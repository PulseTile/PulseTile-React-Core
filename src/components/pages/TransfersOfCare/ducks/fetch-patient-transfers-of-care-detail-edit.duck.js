import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientTransfersOfCareUpdateRequest } from './fetch-patient-transfers-of-care.duck'
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_PATIENT_TRANSFERS_OF_CARE_DETAIL_EDIT_REQUEST = 'FETCH_PATIENT_TRANSFERS_OF_CARE_DETAIL_EDIT_REQUEST';
export const FETCH_PATIENT_TRANSFERS_OF_CARE_DETAIL_EDIT_SUCCESS = 'FETCH_PATIENT_TRANSFERS_OF_CARE_DETAIL_EDIT_SUCCESS';
export const FETCH_PATIENT_TRANSFERS_OF_CARE_DETAIL_EDIT_FAILURE = 'FETCH_PATIENT_TRANSFERS_OF_CARE_DETAIL_EDIT_FAILURE';

export const fetchPatientTransfersOfCareDetailEditRequest = createAction(FETCH_PATIENT_TRANSFERS_OF_CARE_DETAIL_EDIT_REQUEST);
export const fetchPatientTransfersOfCareDetailEditSuccess = createAction(FETCH_PATIENT_TRANSFERS_OF_CARE_DETAIL_EDIT_SUCCESS);
export const fetchPatientTransfersOfCareDetailEditFailure = createAction(FETCH_PATIENT_TRANSFERS_OF_CARE_DETAIL_EDIT_FAILURE);

export const fetchPatientTransfersOfCareDetailEditEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_TRANSFERS_OF_CARE_DETAIL_EDIT_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.put(`${usersUrls.PATIENTS_URL}/${payload.userId}/events/toc/${payload.sourceId}`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;

          return [
            fetchPatientTransfersOfCareDetailEditSuccess(response),
            fetchPatientTransfersOfCareUpdateRequest({ userId, sourceId }),
          ];
        })
        .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(transfersOfCareDetailEdit = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_TRANSFERS_OF_CARE_DETAIL_EDIT_SUCCESS:
      return action.payload;
    default:
      return transfersOfCareDetailEdit;
  }
}