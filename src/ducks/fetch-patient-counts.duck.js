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

const mergeObjects = _.reduce(_.merge, {});
const createPatientCountsUrl = id => `${usersUrls.PATIENTS_URL}/${id}/counts`;
const fetchPatientCounts$ = (id, store) => ajax.getJSON(createPatientCountsUrl(id), {
  headers: { Cookie: store.getState().credentials.cookie },
})
  .map(response => ({ [id]: response }));

export const fetchPatientCountsEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_COUNTS_REQUEST)
    .mergeMap(action => Observable.merge(..._.cond([
      [_.has('id'), () => fetchPatientCounts$(action.payload.id, store)],
      [_.isArray, _.map(({ id }) => fetchPatientCounts$(id, store))],
    ])(action.payload))
      .reduce((acc, x) => acc.concat(x), [])
      .map(fetchPatientCountsSuccess)
      .catch(error => Observable.of(fetchPatientCountsFailure(error)))
    );

export default function reducer(patientsCounts = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_COUNTS_SUCCESS:
      return _.flow(mergeObjects, _.merge(patientsCounts))(action.payload);
    default:
      return patientsCounts;
  }
}
