import _ from 'lodash/fp';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_FEEDS_DETAIL_REQUEST = 'FETCH_FEEDS_DETAIL_REQUEST';
export const FETCH_FEEDS_DETAIL_SUCCESS = 'FETCH_FEEDS_DETAIL_SUCCESS';
export const FETCH_FEEDS_DETAIL_FAILURE = 'FETCH_FEEDS_DETAIL_FAILURE';

export const fetchFeedsDetailRequest = createAction(FETCH_FEEDS_DETAIL_REQUEST);
export const fetchFeedsDetailSuccess = createAction(FETCH_FEEDS_DETAIL_SUCCESS);
export const fetchFeedsDetailFailure = createAction(FETCH_FEEDS_DETAIL_FAILURE);

export const fetchFeedsDetailEpic = (action$, store) =>
  action$.ofType(FETCH_FEEDS_DETAIL_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.FEEDS}/${payload.sourceId}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchFeedsDetailSuccess({
          feedsDetail: response,
          token: response.token,
        }))

    );

export default function reducer(feedsDetail = {}, action) {
  switch (action.type) {
    case FETCH_FEEDS_DETAIL_SUCCESS:
      return _.set(action.payload.feedsDetail, feedsDetail);
    default:
      return feedsDetail;
  }
}