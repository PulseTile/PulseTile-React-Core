import { createSelector } from 'reselect';

const sidebarVisibilitySelector = ({ isSidebarVisible }) => isSidebarVisible;

const sidebarSelector = createSelector(
  sidebarVisibilitySelector,
  isSidebarVisible => ({ isSidebarVisible })
);

export default sidebarSelector;
