import { createSelector } from 'reselect';

const sidebarVisibilitySelector = ({ isSidebarVisible }) => isSidebarVisible;
const userAccountSelector = ({ userAccount }) => userAccount;

const sidebarAndUserSelector = createSelector(
  sidebarVisibilitySelector,
  userAccountSelector,
  (isSidebarVisible, userAccount) => ({ isSidebarVisible, userAccount })
)

export default sidebarAndUserSelector;
