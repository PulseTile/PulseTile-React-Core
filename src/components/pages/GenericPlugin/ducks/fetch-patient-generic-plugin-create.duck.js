import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientGenericPluginRequest } from './fetch-patient-generic-plugin.duck'

export const FETCH_PATIENT_GENERIC_PLUGIN_CREATE_REQUEST = 'FETCH_PATIENT_GENERIC_PLUGIN_CREATE_REQUEST';
export const FETCH_PATIENT_GENERIC_PLUGIN_CREATE_SUCCESS = 'FETCH_PATIENT_GENERIC_PLUGIN_CREATE_SUCCESS';
export const FFETCH_PATIENT_GENERIC_PLUGIN_CREATE_FAILURE = 'FFETCH_PATIENT_GENERIC_PLUGIN_CREATE_FAILURE';

export const fetchPatientGenericPluginCreateRequest = createAction(FETCH_PATIENT_GENERIC_PLUGIN_CREATE_REQUEST);
export const fetchPatientGenericPluginCreateSuccess = createAction(FETCH_PATIENT_GENERIC_PLUGIN_CREATE_SUCCESS);
export const fetchPatientGenericPluginCreateFailure = createAction(FFETCH_PATIENT_GENERIC_PLUGIN_CREATE_FAILURE);

export const fetchPatientGenericPluginCreateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_GENERIC_PLUGIN_CREATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.post(`${usersUrls.PATIENTS_URL}/${payload.userId}/generic-plugin`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;

          return [
            fetchPatientGenericPluginCreateSuccess(response),
            fetchPatientGenericPluginRequest({ userId }),
          ];
        })
        .catch(error => Observable.of(fetchPatientGenericPluginCreateFailure(error)))
    );

export default function reducer(patientGenericPluginCreate = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_GENERIC_PLUGIN_CREATE_SUCCESS:
      return action.payload;
    default:
      return patientGenericPluginCreate
  }
}
