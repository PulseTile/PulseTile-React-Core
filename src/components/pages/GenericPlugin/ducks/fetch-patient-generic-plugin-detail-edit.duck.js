import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_EDIT_REQUEST = 'FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_EDIT_REQUEST';
export const FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_EDIT_SUCCESS = 'FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_EDIT_SUCCESS';
export const FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_EDIT_FAILURE = 'FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_EDIT_FAILURE';

export const fetchPatientGenericPluginDetailEditRequest = createAction(FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_EDIT_REQUEST);
export const fetchPatientGenericPluginDetailEditSuccess = createAction(FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_EDIT_SUCCESS);
export const fetchPatientGenericPluginDetailEditFailure = createAction(FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_EDIT_FAILURE);

export const fetchPatientGenericPluginDetailEditEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_EDIT_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.put(`${usersUrls.PATIENTS_URL}/${payload.userId}/clinicalnotes`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .map(({ response }) => fetchPatientGenericPluginDetailEditSuccess(response))
        .catch(error => Observable.of(fetchPatientGenericPluginDetailEditFailure(error)))
    );

export default function reducer(genericPluginDetailEdit = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_EDIT_SUCCESS:
      return action.payload;
    default:
      return genericPluginDetailEdit;
  }
}