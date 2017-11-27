import { createSelector } from 'reselect';

const initialiseDataSelector = ({ initialiseData }) => initialiseData;

const initialiseSelector = createSelector(
  initialiseDataSelector,
  initialiseData => ({ initialiseData })
);


export default initialiseSelector;
