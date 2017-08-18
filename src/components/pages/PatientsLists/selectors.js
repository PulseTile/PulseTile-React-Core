import _ from 'lodash/fp';
import { createSelector } from 'reselect';

const allPatientsSelector = ({ patients }) => patients;

const patientsSelector = createSelector(
  allPatientsSelector,
  allPatients => ({ allPatients })
);

export default patientsSelector;
