import { createSelector } from 'reselect';

const userAccountSelector = createSelector(
  ({ router }) => router,
  ({ userAccount }) => userAccount,
  (router, userAccount) => ({ router, userAccount })
);

export default userAccountSelector;
