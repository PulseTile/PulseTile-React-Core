import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';
import { get } from 'lodash';

import { usersUrls } from '../config/server-urls.constants';
import { testConstants } from '../config/for-test.constants';

export const FETCH_PATIENT_DEMOGRAPHICS_REQUEST = 'FETCH_PATIENT_DEMOGRAPHICS_REQUEST';
export const FETCH_PATIENT_DEMOGRAPHICS_SUCCESS = 'FETCH_PATIENT_DEMOGRAPHICS_SUCCESS';
export const FETCH_PATIENT_DEMOGRAPHICS_FAILURE = 'FETCH_PATIENT_DEMOGRAPHICS_FAILURE';

export const fetchPatientDemographicsRequest = createAction(FETCH_PATIENT_DEMOGRAPHICS_REQUEST);
export const fetchPatientDemographicsSuccess = createAction(FETCH_PATIENT_DEMOGRAPHICS_SUCCESS);
export const fetchPatientDemographicsFailure = createAction(FETCH_PATIENT_DEMOGRAPHICS_FAILURE);

export const fetchPatientDemographicsEpic = (action$, store) =>
    action$.ofType(FETCH_PATIENT_DEMOGRAPHICS_REQUEST)
        .mergeMap(({ payload }) =>
            ajax.getJSON(`http://dev.ripple.foundation:8000/api/demographics/${payload.userId}`, {
                Authorization: 'Bearer '+testConstants.token
            })
                .map(response => fetchPatientDemographicsSuccess({
                    userId: payload.userId,
                    demographics: get(response, 'demographics', {}),
                }))
        );

// export const fetchPatientDemographicsEpic = (action$, store) =>
//   action$.ofType(FETCH_PATIENT_DEMOGRAPHICS_REQUEST)
//     .mergeMap(({ payload }) =>
//       ajax.getJSON(`${usersUrls.PATIENTS_DEMOGRAPHICS_URL}/${payload.userId}`, {})
//         .map(response => fetchPatientDemographicsSuccess({
//           userId: payload.userId,
//           demographics: get(response, 'demographics', {}),
//         }))
//   );

export default function reducer(patientsDemographics = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_DEMOGRAPHICS_SUCCESS:
      return _.set(action.payload.userId, action.payload.demographics, patientsDemographics);
    default:
      return patientsDemographics;
  }
}
