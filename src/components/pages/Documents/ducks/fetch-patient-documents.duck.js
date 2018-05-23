import _ from 'lodash/fp';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { hasTokenInResponse } from '../../../../utils/plugin-helpers.utils';

export const FETCH_PATIENT_DOCUMENTS_REQUEST = 'FETCH_PATIENT_DOCUMENTS_REQUEST';
export const FETCH_PATIENT_DOCUMENTS_SUCCESS = 'FETCH_PATIENT_DOCUMENTS_SUCCESS';
export const FETCH_PATIENT_DOCUMENTS_FAILURE = 'FETCH_PATIENT_DOCUMENTS_FAILURE';

export const fetchPatientDocumentsRequest = createAction(FETCH_PATIENT_DOCUMENTS_REQUEST);
export const fetchPatientDocumentsSuccess = createAction(FETCH_PATIENT_DOCUMENTS_SUCCESS);
export const fetchPatientDocumentsFailure = createAction(FETCH_PATIENT_DOCUMENTS_FAILURE);

export const fetchPatientDocumentsEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_DOCUMENTS_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`/api/documents/patient/${payload.userId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map((response) => {
          const token = hasTokenInResponse(response);
          return fetchPatientDocumentsSuccess({
            userId: payload.userId,
            documents: response,
            token,
          })
        })
    );


export default function reducer(patientsDocuments = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_DOCUMENTS_SUCCESS:
      return _.set(action.payload.userId, action.payload.documents, patientsDocuments);
    default:
      return patientsDocuments;
  }
}
