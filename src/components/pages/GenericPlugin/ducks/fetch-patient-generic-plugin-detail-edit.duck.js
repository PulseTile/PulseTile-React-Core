import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientGenericPluginUpdateRequest } from './fetch-patient-generic-plugin.duck'
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_EDIT_REQUEST = 'FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_EDIT_REQUEST';
export const FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_EDIT_SUCCESS = 'FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_EDIT_SUCCESS';
export const FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_EDIT_FAILURE = 'FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_EDIT_FAILURE';

export const fetchPatientGenericPluginDetailEditRequest = createAction(FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_EDIT_REQUEST);
export const fetchPatientGenericPluginDetailEditSuccess = createAction(FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_EDIT_SUCCESS);
export const fetchPatientGenericPluginDetailEditFailure = createAction(FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_EDIT_FAILURE);

export const fetchPatientGenericPluginDetailEditEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_EDIT_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.put(`${usersUrls.PATIENTS_URL}/${payload.userId}/generic-plugin/${payload.sourceId}`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;

          return [
            fetchPatientGenericPluginDetailEditSuccess(response),
            fetchPatientGenericPluginUpdateRequest({ userId, sourceId }),
          ];
        })
        // .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(genericPluginDetailEdit = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_EDIT_SUCCESS:
      return action.payload;
    default:
      return genericPluginDetailEdit;
  }
}