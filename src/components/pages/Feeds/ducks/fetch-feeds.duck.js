import _ from 'lodash/fp';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchFeedsDetailRequest } from './fetch-feeds-detail.duck';
import { hasTokenInResponse } from '../../../../utils/plugin-helpers.utils'

export const FETCH_FEEDS_REQUEST = 'FETCH_FEEDS_REQUEST';
export const FETCH_FEEDS_SUCCESS = 'FETCH_FEEDS_SUCCESS';
export const FETCH_FEEDS_FAILURE = 'FETCH_FEEDS_FAILURE';
export const FETCH_FEEDS_UPDATE_REQUEST = 'FETCH_FEEDS_UPDATE_REQUEST';

export const fetchFeedsRequest = createAction(FETCH_FEEDS_REQUEST);
export const fetchFeedsSuccess = createAction(FETCH_FEEDS_SUCCESS);
export const fetchFeedsFailure = createAction(FETCH_FEEDS_FAILURE);
export const fetchFeedsUpdateRequest = createAction(FETCH_FEEDS_UPDATE_REQUEST);

export const fetchFeedsEpic = (action$, store) =>
  action$.ofType(FETCH_FEEDS_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.FEEDS}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map((response) => {
          const token = hasTokenInResponse(response);
          return fetchFeedsSuccess({
            feeds: response,
            token,
          })
        })
    );

export const fetchFeedsUpdateEpic = (action$, store) =>
  action$.ofType(FETCH_FEEDS_UPDATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.FEEDS}`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .flatMap((response) => {
          const sourceId = payload.sourceId;

          return [
            fetchFeedsSuccess({ feeds: response }),
            fetchFeedsDetailRequest({ sourceId }),
          ]
        })

    );

export default function reducer(feeds = {}, action) {
  switch (action.type) {
    case FETCH_FEEDS_SUCCESS:
      return _.set(action.payload.feeds, feeds);
    default:
      return feeds;
  }
}
