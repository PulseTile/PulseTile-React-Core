import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_PATIENT_ALLERGIES_REQUEST = 'FETCH_PATIENT_ALLERGIES_REQUEST';
export const FETCH_PATIENT_ALLERGIES_SUCCESS = 'FETCH_PATIENT_ALLERGIES_SUCCESS';
export const FETCH_PATIENT_ALLERGIES_FAILURE = 'FETCH_PATIENT_ALLERGIES_FAILURE';

export const fetchPatientAllergiesRequest = createAction(FETCH_PATIENT_ALLERGIES_REQUEST);
export const fetchPatientAllergiesSuccess = createAction(FETCH_PATIENT_ALLERGIES_SUCCESS);
export const fetchPatientAllergiesFailure = createAction(FETCH_PATIENT_ALLERGIES_FAILURE);

export const fetchPatientAllergiesEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_ALLERGIES_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/allergies`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientAllergiesSuccess({
          userId: payload.userId,
          allergies: response,
        }))
        .catch(error => Observable.of(fetchPatientAllergiesFailure(error)))
    );

export default function reducer(patientsAllergies = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_ALLERGIES_SUCCESS:
      return _.set(action.payload.userId, action.payload.allergies, patientsAllergies);
    default:
      return patientsAllergies;
  }
}
