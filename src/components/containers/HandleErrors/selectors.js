import { createSelector } from 'reselect';

const requestErrorsSelector = state => state.requestError;

const requestErrorSelector = createSelector(
  requestErrorsSelector,
  requestError => ({ requestError })
);

export default requestErrorSelector;
