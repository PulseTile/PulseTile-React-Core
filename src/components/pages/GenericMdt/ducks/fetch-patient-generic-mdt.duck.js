import _ from 'lodash/fp';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientMDTsDetailRequest } from './fetch-patient-generic-mdt-detail.duck';
import { hasTokenInResponse } from '../../../../utils/plugin-helpers.utils';

export const FETCH_PATIENT_MDTS_REQUEST = 'FETCH_PATIENT_MDTS_REQUEST';
export const FETCH_PATIENT_MDTS_SUCCESS = 'FETCH_PATIENT_MDTS_SUCCESS';
export const FETCH_PATIENT_MDTS_FAILURE = 'FETCH_PATIENT_MDTS_FAILURE';
export const FETCH_PATIENT_MDTS_UPDATE_REQUEST = 'FETCH_PATIENT_MDTS_UPDATE_REQUEST';

export const fetchPatientMDTsRequest = createAction(FETCH_PATIENT_MDTS_REQUEST);
export const fetchPatientMDTsSuccess = createAction(FETCH_PATIENT_MDTS_SUCCESS);
export const fetchPatientMDTsFailure = createAction(FETCH_PATIENT_MDTS_FAILURE);
export const fetchPatientMDTsUpdateRequest = createAction(FETCH_PATIENT_MDTS_UPDATE_REQUEST);

export const fetchPatientMDTsEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_MDTS_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/mdtreports`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map((response) => {
          const token = hasTokenInResponse(response);
          return fetchPatientMDTsSuccess({
            userId: payload.userId,
            mdts: response,
            token,
          })
        })
    );

export const fetchPatientMDTsUpdateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_MDTS_UPDATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/mdtreports`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .flatMap((response) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;

          return [
            fetchPatientMDTsSuccess({ userId, mdts: response }),
            fetchPatientMDTsDetailRequest({ userId, sourceId }),
          ]
        })
        
    );

export default function reducer(patientsMDTs = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_MDTS_SUCCESS:
      return _.set(action.payload.userId, action.payload.mdts, patientsMDTs);
    default:
      return patientsMDTs;
  }
}
