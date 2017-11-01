import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_PATIENT_GENERIC_PLUGIN_REQUEST = 'FETCH_PATIENT_GENERIC_PLUGIN_REQUEST';
export const FETCH_PATIENT_GENERIC_PLUGIN_SUCCESS = 'FETCH_PATIENT_GENERIC_PLUGIN_SUCCESS';
export const FETCH_PATIENT_GENERIC_PLUGIN_FAILURE = 'FETCH_PATIENT_GENERIC_PLUGIN_FAILURE';

export const fetchPatientGenericPluginRequest = createAction(FETCH_PATIENT_GENERIC_PLUGIN_REQUEST);
export const fetchPatientGenericPluginSuccess = createAction(FETCH_PATIENT_GENERIC_PLUGIN_SUCCESS);
export const fetchPatientGenericPluginFailure = createAction(FETCH_PATIENT_GENERIC_PLUGIN_FAILURE);

export const fetchPatientGenericPluginEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_GENERIC_PLUGIN_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/clinicalnotes`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientGenericPluginSuccess({
          userId: payload.userId,
          clinicalNotes: response,
        }))
        .catch(error => Observable.of(fetchPatientGenericPluginFailure(error)))
    );

export default function reducer(patientsGenericPlugin = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_GENERIC_PLUGIN_SUCCESS:
      return _.set(action.payload.userId, action.payload.clinicalNotes, patientsGenericPlugin);
    default:
      return patientsGenericPlugin;
  }
}
