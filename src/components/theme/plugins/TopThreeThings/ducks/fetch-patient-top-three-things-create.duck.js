import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../../config/server-urls.constants';
import { fetchPatientTopThreeThingsRequest } from './fetch-patient-top-three-things.duck';

export const FETCH_PATIENT_TOP_THREE_THINGS_CREATE_REQUEST = 'FETCH_PATIENT_TOP_THREE_THINGS_CREATE_REQUEST';
export const FETCH_PATIENT_TOP_THREE_THINGS_CREATE_SUCCESS = 'FETCH_PATIENT_TOP_THREE_THINGS_CREATE_SUCCESS';
export const FETCH_PATIENT_TOP_THREE_THINGS_CREATE_FAILURE = 'FETCH_PATIENT_TOP_THREE_THINGS_CREATE_FAILURE';

export const fetchPatientTopThreeThingsCreateRequest = createAction(FETCH_PATIENT_TOP_THREE_THINGS_CREATE_REQUEST);
export const fetchPatientTopThreeThingsCreateSuccess = createAction(FETCH_PATIENT_TOP_THREE_THINGS_CREATE_SUCCESS);
export const fetchPatientTopThreeThingsCreateFailure = createAction(FETCH_PATIENT_TOP_THREE_THINGS_CREATE_FAILURE);

export const fetchPatientTopThreeThingsCreateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_TOP_THREE_THINGS_CREATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.post(`${usersUrls.PATIENTS_URL}/${payload.userId}/top3Things`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;
          return [
            fetchPatientTopThreeThingsCreateSuccess(response),
            fetchPatientTopThreeThingsRequest({ userId }),
          ];
        })
    );

export default function reducer(patientTopThreeThingsCreate = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_TOP_THREE_THINGS_CREATE_SUCCESS:
      return action.payload;
    default:
      return patientTopThreeThingsCreate
  }
}
