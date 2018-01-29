import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientImagesDetailRequest } from './fetch-patient-images-detail.duck';
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_PATIENT_IMAGES_REQUEST = 'FETCH_PATIENT_IMAGES_REQUEST';
export const FETCH_PATIENT_IMAGES_SUCCESS = 'FETCH_PATIENT_IMAGES_SUCCESS';
export const FETCH_PATIENT_IMAGES_FAILURE = 'FETCH_PATIENT_IMAGES_FAILURE';

export const fetchPatientImagesRequest = createAction(FETCH_PATIENT_IMAGES_REQUEST);
export const fetchPatientImagesSuccess = createAction(FETCH_PATIENT_IMAGES_SUCCESS);
export const fetchPatientImagesFailure = createAction(FETCH_PATIENT_IMAGES_FAILURE);

export const fetchPatientImagesEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_IMAGES_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/dicom/studies`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientImagesSuccess({
          userId: payload.userId,
          images: response,
        }))
        .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(patientsImages = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_IMAGES_SUCCESS:
      return _.set(action.payload.userId, action.payload.images, patientsImages);
    default:
      return patientsImages;
  }
}
