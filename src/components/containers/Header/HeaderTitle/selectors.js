import { createSelector } from 'reselect';

const routerSelector = createSelector(
  ({ router }) => router,
  router => ({ router })
);

export default routerSelector;
