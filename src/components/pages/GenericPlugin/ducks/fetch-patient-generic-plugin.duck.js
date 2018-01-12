import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientGenericPluginDetailRequest } from './fetch-patient-generic-plugin-detail.duck';

export const FETCH_PATIENT_GENERIC_PLUGIN_REQUEST = 'FETCH_PATIENT_GENERIC_PLUGIN_REQUEST';
export const FETCH_PATIENT_GENERIC_PLUGIN_SUCCESS = 'FETCH_PATIENT_GENERIC_PLUGIN_SUCCESS';
export const FETCH_PATIENT_GENERIC_PLUGIN_FAILURE = 'FETCH_PATIENT_GENERIC_PLUGIN_FAILURE';
export const FETCH_PATIENT_GENERIC_PLUGIN_UPDATE_REQUEST = 'FETCH_PATIENT_GENERIC_PLUGIN_UPDATE_REQUEST';

export const fetchPatientGenericPluginRequest = createAction(FETCH_PATIENT_GENERIC_PLUGIN_REQUEST);
export const fetchPatientGenericPluginSuccess = createAction(FETCH_PATIENT_GENERIC_PLUGIN_SUCCESS);
export const fetchPatientGenericPluginFailure = createAction(FETCH_PATIENT_GENERIC_PLUGIN_FAILURE);
export const fetchPatientGenericPluginUpdateRequest = createAction(FETCH_PATIENT_GENERIC_PLUGIN_UPDATE_REQUEST);

export const fetchPatientGenericPluginEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_GENERIC_PLUGIN_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/generic-plugin`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientGenericPluginSuccess({
          userId: payload.userId,
          genericPlugin: response,
        }))
        .catch(error => Observable.of(fetchPatientGenericPluginFailure(error)))
    );

export const fetchPatientGenericPluginUpdateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_GENERIC_PLUGIN_UPDATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/generic-plugin`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .flatMap((response) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;

          return [
            fetchPatientGenericPluginSuccess({ userId, genericPlugin: response }),
            fetchPatientGenericPluginDetailRequest({ userId, sourceId }),
          ]
        })
        .catch(error => Observable.of(fetchPatientGenericPluginFailure(error)))
    );

export default function reducer(patientsGenericPlugin = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_GENERIC_PLUGIN_SUCCESS:
      return _.set(action.payload.userId, action.payload.genericPlugin, patientsGenericPlugin);
    default:
      return patientsGenericPlugin;
  }
}
