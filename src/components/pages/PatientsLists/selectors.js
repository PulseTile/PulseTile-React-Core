import _ from 'lodash/fp';
import { createSelector } from 'reselect';

const allPatientsSelector = ({ patients }) => patients;

const patientsSelector = createSelector(
  allPatientsSelector,
  allPatients => ({ allPatients: _.values(allPatients) })
);

export default patientsSelector;
