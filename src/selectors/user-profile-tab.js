import { createSelector }  from 'reselect';

const userProfileTabSelector = createSelector(
  state => state.userProfileTabs,
  userProfileTabs => ({ userProfileTabs })
);

export { userProfileTabSelector };
