import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';

import { usersUrls } from '../../../../config/server-urls.constants'

export const FETCH_LIST_ORDERS_REQUEST = 'FETCH_LIST_ORDERS_REQUEST';
export const FETCH_LIST_ORDERS_SUCCESS = 'FETCH_LIST_ORDERS_SUCCESS';
export const FETCH_LIST_ORDERS_FAILURE = 'FETCH_LIST_ORDERS_FAILURE';

export const fetchListOrdersRequest = createAction(FETCH_LIST_ORDERS_REQUEST);
export const fetchListOrdersSuccess = createAction(FETCH_LIST_ORDERS_SUCCESS);
export const fetchListOrdersFailure = createAction(FETCH_LIST_ORDERS_FAILURE);

export const fetchListOrdersEpic = (action$, store) =>
  action$.ofType(FETCH_LIST_ORDERS_REQUEST)
    .mergeMap(() =>
      ajax.getJSON(usersUrls.LIST_ORDERS, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(fetchListOrdersSuccess)
    );

export default function reducer(listOrders = {}, action) {
  switch (action.type) {
    case FETCH_LIST_ORDERS_SUCCESS:
      return action.payload;
    default:
      return listOrders
  }
}

