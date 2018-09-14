import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientTopThreeThingsUpdateRequest } from './fetch-patient-top-three-things.duck'

export const FETCH_PATIENT_TOP_THREE_THINGS_DETAIL_EDIT_REQUEST = 'FETCH_PATIENT_TOP_THREE_THINGS_DETAIL_EDIT_REQUEST';
export const FETCH_PATIENT_TOP_THREE_THINGS_DETAIL_EDIT_SUCCESS = 'FETCH_PATIENT_TOP_THREE_THINGS_DETAIL_EDIT_SUCCESS';
export const FETCH_PATIENT_TOP_THREE_THINGS_DETAIL_EDIT_FAILURE = 'FETCH_PATIENT_TOP_THREE_THINGS_DETAIL_EDIT_FAILURE';

export const fetchPatientTopThreeThingsDetailEditRequest = createAction(FETCH_PATIENT_TOP_THREE_THINGS_DETAIL_EDIT_REQUEST);
export const fetchPatientTopThreeThingsDetailEditSuccess = createAction(FETCH_PATIENT_TOP_THREE_THINGS_DETAIL_EDIT_SUCCESS);
export const fetchPatientTopThreeThingsDetailEditFailure = createAction(FETCH_PATIENT_TOP_THREE_THINGS_DETAIL_EDIT_FAILURE);

export const fetchPatientTopThreeThingsDetailEditEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_TOP_THREE_THINGS_DETAIL_EDIT_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.put(`${usersUrls.PATIENTS_URL}/${payload.userId}/top3Things/${payload.sourceId}`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;

          return [
            fetchPatientTopThreeThingsDetailEditSuccess(response),
            fetchPatientTopThreeThingsUpdateRequest({ userId, sourceId }),
          ];
        })
    );

export default function reducer(topThreeThingsDetailEdit = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_TOP_THREE_THINGS_DETAIL_EDIT_SUCCESS:
      return action.payload;
    default:
      return topThreeThingsDetailEdit;
  }
}