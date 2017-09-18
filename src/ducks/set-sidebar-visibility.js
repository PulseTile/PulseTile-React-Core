import { createAction } from 'redux-actions';

export const SET_SIDEBAR_VISIBILITY = 'SET_SIDEBAR_VISIBILITY';

export const setSidebarVisibility = createAction(SET_SIDEBAR_VISIBILITY);

export default function reducer(isSidebarVisible = false, action) {
  switch (action.type) {
    case SET_SIDEBAR_VISIBILITY:
      return action.payload;
    default:
      return isSidebarVisible
  }
}
