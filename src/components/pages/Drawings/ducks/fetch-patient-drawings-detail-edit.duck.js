import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientDrawingsUpdateRequest } from './fetch-patient-drawings.duck'
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_PATIENT_DRAWINGS_DETAIL_EDIT_REQUEST = 'FETCH_PATIENT_DRAWINGS_DETAIL_EDIT_REQUEST';
export const FETCH_PATIENT_DRAWINGS_DETAIL_EDIT_SUCCESS = 'FETCH_PATIENT_DRAWINGS_DETAIL_EDIT_SUCCESS';
export const FETCH_PATIENT_DRAWINGS_DETAIL_EDIT_FAILURE = 'FETCH_PATIENT_DRAWINGS_DETAIL_EDIT_FAILURE';

export const fetchPatientDrawingsDetailEditRequest = createAction(FETCH_PATIENT_DRAWINGS_DETAIL_EDIT_REQUEST);
export const fetchPatientDrawingsDetailEditSuccess = createAction(FETCH_PATIENT_DRAWINGS_DETAIL_EDIT_SUCCESS);
export const fetchPatientDrawingsDetailEditFailure = createAction(FETCH_PATIENT_DRAWINGS_DETAIL_EDIT_FAILURE);

export const fetchPatientDrawingsDetailEditEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_DRAWINGS_DETAIL_EDIT_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.put(`${usersUrls.PICTURES}/${payload.userId}/${payload.sourceId}`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;

          return [
            fetchPatientDrawingsDetailEditSuccess(response),
            fetchPatientDrawingsUpdateRequest({ userId, sourceId }),
          ];
        })
        .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(drawingsDetailEdit = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_DRAWINGS_DETAIL_EDIT_SUCCESS:
      return action.payload;
    default:
      return drawingsDetailEdit;
  }
}
