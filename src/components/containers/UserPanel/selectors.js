import { createSelector } from 'reselect';

const usersAccountSelector = state => state.userAccount;

const userAccountSelector = createSelector(
  usersAccountSelector,
  user => ({ user })
);

export default userAccountSelector;
