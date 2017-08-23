import _ from 'lodash/fp';
import { createSelector } from 'reselect';

const allPatientsSelector = ({ patients }) => _.values(patients);
const patientsCountsSelector = ({ patientsCounts }) => patientsCounts;

const patientsSelector = createSelector(
  allPatientsSelector,
  patientsCountsSelector,
  (allPatients, patientsCounts) => {
    const getPatientCounts = id =>_.getOr({}, [id, 0], patientsCounts); //TODO maybe patient counts can be not only [{}] but [{}, ..., {}]
    const allPatientsWithCounts = _.map(({ id, ...restPatient }) => ({ id, ...restPatient, ...getPatientCounts(id) }), allPatients);
    return ({ allPatients, patientsCounts, allPatientsWithCounts });
  }
);

export default patientsSelector;
