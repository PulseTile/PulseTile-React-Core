import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_REQUEST = 'FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_REQUEST';
export const FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_SUCCESS = 'FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_SUCCESS';
export const FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_FAILURE = 'FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_FAILURE';

export const fetchPatientGenericPluginDetailRequest = createAction(FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_REQUEST);
export const fetchPatientGenericPluginDetailSuccess = createAction(FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_SUCCESS);
export const fetchPatientGenericPluginDetailFailure = createAction(FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_FAILURE);

export const fetchPatientGenericPluginDetailEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/generic-plugin/${payload.sourceId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientGenericPluginDetailSuccess({
          userId: payload.userId,
          genericPluginDetail: response,
        }))
        // .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(genericPluginDetail = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_GENERIC_PLUGIN_DETAIL_SUCCESS:
      return _.set(action.payload.userId, action.payload.genericPluginDetail, genericPluginDetail);
    default:
      return genericPluginDetail;
  }
}