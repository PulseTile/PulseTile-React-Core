import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchSeriesDetailRequest } from '../../Images/ducks/fetch-series-detail.duck';
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_SERIES_REQUEST = 'FETCH_SERIES_REQUEST';
export const FETCH_SERIES_SUCCESS = 'FETCH_SERIES_SUCCESS';
export const FETCH_SERIES_FAILURE = 'FETCH_SERIES_FAILURE';

export const fetchSeriesRequest = createAction(FETCH_SERIES_REQUEST);
export const fetchSeriesSuccess = createAction(FETCH_SERIES_SUCCESS);
export const fetchSeriesFailure = createAction(FETCH_SERIES_FAILURE);

export const fetchSeriesEpic = (action$, store) =>
  action$.ofType(FETCH_SERIES_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/dicom/studies/${payload.studyId}/series?source=${payload.source}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .flatMap((response) => {
          const userId = payload.userId;
          const seriesId = response.seriesIds[0];
          const source = 'orthanc';

          return [
            fetchSeriesSuccess({ userId, allSeries: response }),
            fetchSeriesDetailRequest({ userId, seriesId, source }),
          ]
        })
        .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(allSeries = {}, action) {
  switch (action.type) {
    case FETCH_SERIES_SUCCESS:
      return _.set(action.payload.userId, action.payload.allSeries, allSeries);
    default:
      return allSeries;
  }
}
