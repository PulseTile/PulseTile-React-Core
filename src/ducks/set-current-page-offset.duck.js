import { Observable } from 'rxjs';
import { createAction } from 'redux-actions';

export const SET_CURRENT_PAGE_OFFSET_START = 'SET_CURRENT_PAGE_OFFSET_START';
export const SET_CURRENT_PAGE_OFFSET_SUCCESS = 'SET_CURRENT_PAGE_OFFSET_SUCCESS';
export const SET_CURRENT_PAGE_OFFSET_FAILURE = 'SET_CURRENT_PAGE_OFFSET_FAILURE';

export const setCurrentPageOffsetStart = createAction(SET_CURRENT_PAGE_OFFSET_START);
export const setCurrentPageOffsetSuccess = createAction(SET_CURRENT_PAGE_OFFSET_SUCCESS);
export const setCurrentPageOffsetFailure = createAction(SET_CURRENT_PAGE_OFFSET_FAILURE);

export const setCurrentPageOffsetEpic = (action$, store) =>
  action$.ofType(SET_CURRENT_PAGE_OFFSET_START)
    .map(action => setCurrentPageOffsetSuccess(action.payload))
    .catch(error => Observable.of(setCurrentPageOffsetFailure(error)))

export default function reducer(currentPageOffset = {}, action) {
  switch (action.type) {
    case SET_CURRENT_PAGE_OFFSET_SUCCESS:
      return action.payload;
    default:
      return currentPageOffset;
  }
}
