import { createSelector } from 'reselect';

const requestErrorsSelector = state => state.requestError;
const initialiseDataSelector = ({ initialiseData }) => initialiseData;
const patientsInfoSelector = state => state.patientsInfo;

const requestErrorSelector = createSelector(
  requestErrorsSelector,
  requestError => ({ requestError })
);

const initialiseSelector = createSelector(
  initialiseDataSelector,
  initialiseData => ({ initialiseData })
);

const patientInfoSelector = createSelector(
  patientsInfoSelector,
  patientsInfo => ({ patientsInfo })
);

export { requestErrorSelector, initialiseSelector, patientInfoSelector };
