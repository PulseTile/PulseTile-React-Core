import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchFeedsUpdateRequest } from './fetch-feeds.duck'
import {handleErrors} from "../../../../ducks/handle-errors.duck";

export const FETCH_FEEDS_DETAIL_EDIT_REQUEST = 'FETCH_FEEDS_DETAIL_EDIT_REQUEST';
export const FETCH_FEEDS_DETAIL_EDIT_SUCCESS = 'FETCH_FEEDS_DETAIL_EDIT_SUCCESS';
export const FETCH_FEEDS_DETAIL_EDIT_FAILURE = 'FETCH_FEEDS_DETAIL_EDIT_FAILURE';

export const fetchFeedsDetailEditRequest = createAction(FETCH_FEEDS_DETAIL_EDIT_REQUEST);
export const fetchFeedsDetailEditSuccess = createAction(FETCH_FEEDS_DETAIL_EDIT_SUCCESS);
export const fetchFeedsDetailEditFailure = createAction(FETCH_FEEDS_DETAIL_EDIT_FAILURE);

export const fetchFeedsDetailEditEpic = (action$, store) =>
  action$.ofType(FETCH_FEEDS_DETAIL_EDIT_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.put(`${usersUrls.FEEDS}/${payload.sourceId}`, payload, {
        Cookie: store.getState().credentials.cookie,
        'Content-Type': 'application/json',
      })
        .flatMap(({ response }) => {
          const sourceId = payload.sourceId;

          return [
            fetchFeedsDetailEditSuccess(response),
            fetchFeedsUpdateRequest({ sourceId }),
          ];
        })
        // .catch(error => Observable.of(handleErrors(error)))
    );

export default function reducer(feedsDetailEdit = {}, action) {
  switch (action.type) {
    case FETCH_FEEDS_DETAIL_EDIT_SUCCESS:
      return action.payload;
    default:
      return feedsDetailEdit;
  }
}
