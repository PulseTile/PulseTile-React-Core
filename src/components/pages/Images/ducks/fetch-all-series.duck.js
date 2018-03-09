import _ from 'lodash/fp';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchSeriesDetailRequest } from '../../Images/ducks/fetch-series-detail.duck';
import { hasTokenInResponse } from '../../../../utils/plugin-helpers.utils';

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
          const token = hasTokenInResponse(response);

          return [
            fetchSeriesSuccess({ userId, allSeries: response, token }),
            fetchSeriesDetailRequest({ userId, seriesId, source }),
          ]
        })
    );

export default function reducer(allSeries = {}, action) {
  switch (action.type) {
    case FETCH_SERIES_SUCCESS:
      return _.set(action.payload.userId, action.payload.allSeries, allSeries);
    default:
      return allSeries;
  }
}
