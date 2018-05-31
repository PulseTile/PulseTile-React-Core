import _ from 'lodash/fp';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_SERIES_DETAIL_REQUEST = 'FETCH_SERIES_DETAIL_REQUEST';
export const FETCH_SERIES_DETAIL_SUCCESS = 'FETCH_SERIES_DETAIL_SUCCESS';
export const FETCH_SERIES_DETAIL_FAILURE = 'FETCH_SERIES_DETAIL_FAILURE';

export const fetchSeriesDetailRequest = createAction(FETCH_SERIES_DETAIL_REQUEST);
export const fetchSeriesDetailSuccess = createAction(FETCH_SERIES_DETAIL_SUCCESS);
export const fetchSeriesDetailFailure = createAction(FETCH_SERIES_DETAIL_FAILURE);

export const fetchSeriesDetailEpic = (action$, store) =>
  action$.ofType(FETCH_SERIES_DETAIL_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/dicom/series/${payload.seriesId}?source=${payload.source}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchSeriesDetailSuccess({
          userId: payload.userId,
          seriesDetail: response,
        }))
    );

export default function reducer(seriesDetail = {}, action) {
  switch (action.type) {
    case FETCH_SERIES_DETAIL_SUCCESS:
      return _.set(action.payload.userId, action.payload.seriesDetail, seriesDetail);
    default:
      return seriesDetail;
  }
}