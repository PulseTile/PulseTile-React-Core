import { createAction } from 'redux-actions';

export const CHANGE_USER_PROFILE_TAB = 'CHANGE_USER_PROFILE_TAB';

export const changeUserProfileTab = createAction(CHANGE_USER_PROFILE_TAB);

export default function reducer(userProfileTabs = { openedPanel: '', expandedPanel: 'all' }, action) {
  switch (action.type) {
    case CHANGE_USER_PROFILE_TAB:
      return action.payload;
    default:
      return userProfileTabs;
  }
}
