import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_PATIENT_IMAGES_DETAIL_REQUEST = 'FETCH_PATIENT_IMAGES_DETAIL_REQUEST';
export const FETCH_PATIENT_IMAGES_DETAIL_SUCCESS = 'FETCH_PATIENT_IMAGES_DETAIL_SUCCESS';
export const FETCH_PATIENT_IMAGES_DETAIL_FAILURE = 'FETCH_PATIENT_IMAGES_DETAIL_FAILURE';

export const fetchPatientImagesDetailRequest = createAction(FETCH_PATIENT_IMAGES_DETAIL_REQUEST);
export const fetchPatientImagesDetailSuccess = createAction(FETCH_PATIENT_IMAGES_DETAIL_SUCCESS);
export const fetchPatientImagesDetailFailure = createAction(FETCH_PATIENT_IMAGES_DETAIL_FAILURE);

export const fetchPatientImagesDetailEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_IMAGES_DETAIL_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/dicom/studies/${payload.sourceId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientImagesDetailSuccess({
          userId: payload.userId,
          imagesDetail: response,
        }))
        .catch(error => Observable.of(fetchPatientImagesDetailFailure(error)))
    );

export default function reducer(imagesDetail = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_IMAGES_DETAIL_SUCCESS:
      return _.set(action.payload.userId, action.payload.imagesDetail, imagesDetail);
    default:
      return imagesDetail;
  }
}