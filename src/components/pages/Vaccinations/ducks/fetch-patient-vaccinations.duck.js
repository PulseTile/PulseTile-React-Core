import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_PATIENT_VACCINATIONS_REQUEST = 'FETCH_PATIENT_VACCINATIONS_REQUEST';
export const FETCH_PATIENT_VACCINATIONS_SUCCESS = 'FETCH_PATIENT_VACCINATIONS_SUCCESS';
export const FETCH_PATIENT_VACCINATIONS_FAILURE = 'FETCH_PATIENT_VACCINATIONS_FAILURE';

export const fetchPatientVaccinationsRequest = createAction(FETCH_PATIENT_VACCINATIONS_REQUEST);
export const fetchPatientVaccinationsSuccess = createAction(FETCH_PATIENT_VACCINATIONS_SUCCESS);
export const fetchPatientVaccinationsFailure = createAction(FETCH_PATIENT_VACCINATIONS_FAILURE);

export const fetchPatientVaccinationsEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_VACCINATIONS_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/vaccinations`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientVaccinationsSuccess({
          userId: payload.userId,
          vaccinations: response,
        }))
        .catch(error => Observable.of(fetchPatientVaccinationsFailure(error)))
    );

export default function reducer(patientsVaccinations = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_VACCINATIONS_SUCCESS:
      return _.set(action.payload.userId, action.payload.vaccinations, patientsVaccinations);
    default:
      return patientsVaccinations;
  }
}
