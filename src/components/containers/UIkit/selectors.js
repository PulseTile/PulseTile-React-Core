import { createSelector } from 'reselect';

const UIkitSelector = createSelector(
  ({ isSidebarVisible }) => isSidebarVisible,
  ({ isTouchDevice }) => isTouchDevice,
  (isSidebarVisible, isTouchDevice) => {
    return ({
      isSidebarVisible: isSidebarVisible,
      isTouchDevice: isTouchDevice,
    });
  });

export { UIkitSelector };
