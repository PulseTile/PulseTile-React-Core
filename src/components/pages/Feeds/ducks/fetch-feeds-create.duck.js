import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchFeedsRequest } from './fetch-feeds.duck'
import { handleErrors } from '../../../../ducks/handle-errors.duck';

export const FETCH_FEEDS_CREATE_REQUEST = 'FETCH_FEEDS_CREATE_REQUEST';
export const FETCH_FEEDS_CREATE_SUCCESS = 'FETCH_FEEDS_CREATE_SUCCESS';
export const FETCH_FEEDS_CREATE_FAILURE = 'FETCH_FEEDS_CREATE_FAILURE';

export const fetchFeedsCreateRequest = createAction(FETCH_FEEDS_CREATE_REQUEST);
export const fetchFeedsCreateSuccess = createAction(FETCH_FEEDS_CREATE_SUCCESS);
export const fetchFeedsCreateFailure = createAction(FETCH_FEEDS_CREATE_FAILURE);

export const fetchFeedsCreateEpic = (action$, store) =>
  action$.ofType(FETCH_FEEDS_CREATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.post(`${usersUrls.FEEDS}`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {

          return [
            fetchFeedsCreateSuccess(response),
            fetchFeedsRequest(),
          ];
        })
        // .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(feedsCreate = {}, action) {
  switch (action.type) {
    case FETCH_FEEDS_CREATE_SUCCESS:
      return action.payload;
    default:
      return feedsCreate
  }
}
