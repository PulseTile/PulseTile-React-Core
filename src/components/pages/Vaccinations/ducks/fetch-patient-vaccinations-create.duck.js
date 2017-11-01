import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_PATIENT_VACCINATIONS_CREATE_REQUEST = 'FETCH_PATIENT_VACCINATIONS_CREATE_REQUEST';
export const FETCH_PATIENT_VACCINATIONS_CREATE_SUCCESS = 'FETCH_PATIENT_VACCINATIONS_CREATE_SUCCESS';
export const FFETCH_PATIENT_VACCINATIONS_CREATE_FAILURE = 'FFETCH_PATIENT_VACCINATIONS_CREATE_FAILURE';

export const fetchPatientVaccinationsCreateRequest = createAction(FETCH_PATIENT_VACCINATIONS_CREATE_REQUEST);
export const fetchPatientVaccinationsCreateSuccess = createAction(FETCH_PATIENT_VACCINATIONS_CREATE_SUCCESS);
export const fetchPatientVaccinationsCreateFailure = createAction(FFETCH_PATIENT_VACCINATIONS_CREATE_FAILURE);

export const fetchPatientVaccinationsCreateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_VACCINATIONS_CREATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.post(`${usersUrls.PATIENTS_URL}/${payload.userId}/vaccinations`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .map(({ response }) => fetchPatientVaccinationsCreateSuccess(response))
        .catch(error => Observable.of(fetchPatientVaccinationsCreateFailure(error)))
    );

export default function reducer(patientVaccinationsCreate = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_VACCINATIONS_CREATE_SUCCESS:
      return action.payload;
    default:
      return patientVaccinationsCreate
  }
}
