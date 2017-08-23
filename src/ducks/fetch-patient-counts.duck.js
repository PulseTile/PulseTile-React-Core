import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../config/server-urls.constants'

export const FETCH_PATIENT_COUNTS_REQUEST = 'FETCH_PATIENT_COUNTS_REQUEST';
export const FETCH_PATIENT_COUNTS_SUCCESS = 'FETCH_PATIENT_COUNTS_SUCCESS';
export const FETCH_PATIENT_COUNTS_FAILURE = 'FETCH_PATIENT_COUNTS_FAILURE';

export const fetchPatientCountsRequest = createAction(FETCH_PATIENT_COUNTS_REQUEST);
export const fetchPatientCountsSuccess = createAction(FETCH_PATIENT_COUNTS_SUCCESS);
export const fetchPatientCountsFailure = createAction(FETCH_PATIENT_COUNTS_FAILURE);

const getPatientId = action => _.getOr(action.payload, 'payload.id', action);
const getPatientCountsUrl = action => `${usersUrls.PATIENTS_URL}/${getPatientId(action)}/counts`;
const isPatientCountsAlreadyExists = (store, id) => _.flow(_.get(['patientsCounts', id]), _.isEmpty)(store.getState());

export const fetchPatientCountsEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_COUNTS_REQUEST)
    .mergeMap(action =>
      ajax.getJSON(getPatientCountsUrl(action), {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(payload => fetchPatientCountsSuccess({
          id: getPatientId(action),
          counts: payload,
        }))
        .catch(error => Observable.of(fetchPatientCountsFailure(error)))
    );

export default function reducer(patientsCounts = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_COUNTS_SUCCESS:
      return _.set(action.payload.id, action.payload.counts, patientsCounts);
    default:
      return patientsCounts;
  }
}
