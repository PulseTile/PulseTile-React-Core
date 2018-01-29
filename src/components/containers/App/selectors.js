import { createSelector } from 'reselect';

const requestErrorsSelector = state => state.requestError;
const initialiseDataSelector = ({ initialiseData }) => initialiseData;

const requestErrorSelector = createSelector(
  requestErrorsSelector,
  requestError => ({ requestError })
);

const initialiseSelector = createSelector(
  initialiseDataSelector,
  initialiseData => ({ initialiseData })
);

export { requestErrorSelector, initialiseSelector };
