import { createSelector } from 'reselect';

const sidebarVisibilitySelector = createSelector(
  ({ isSidebarVisible }) => isSidebarVisible,
  isSidebarVisible => ({ isSidebarVisible })
);

export default sidebarVisibilitySelector;
