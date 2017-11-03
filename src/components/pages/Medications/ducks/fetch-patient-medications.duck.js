import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_PATIENT_MEDICATIONS_REQUEST = 'FETCH_PATIENT_MEDICATIONS_REQUEST';
export const FETCH_PATIENT_MEDICATIONS_SUCCESS = 'FETCH_PATIENT_MEDICATIONS_SUCCESS';
export const FETCH_PATIENT_MEDICATIONS_FAILURE = 'FETCH_PATIENT_MEDICATIONS_FAILURE';

export const fetchPatientMedicationsRequest = createAction(FETCH_PATIENT_MEDICATIONS_REQUEST);
export const fetchPatientMedicationsSuccess = createAction(FETCH_PATIENT_MEDICATIONS_SUCCESS);
export const fetchPatientMedicationsFailure = createAction(FETCH_PATIENT_MEDICATIONS_FAILURE);

export const fetchPatientMedicationsEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_MEDICATIONS_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/medications`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientMedicationsSuccess({
          userId: payload.userId,
          medications: response,
        }))
        .catch(error => Observable.of(fetchPatientMedicationsFailure(error)))
    );

export default function reducer(patientsMedications = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_MEDICATIONS_SUCCESS:
      return _.set(action.payload.userId, action.payload.medications, patientsMedications);
    default:
      return patientsMedications;
  }
}
