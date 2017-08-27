import _ from 'lodash/fp';
import qs from 'qs';
import { createSelector } from 'reselect';

import { patientsDepartments, patientsAges } from '../../../config/patients.constants';
import { getAgeYears } from '../../../utils/time-helpers.utils';

const getFilterPredicate = (prefix, filterCriteriaLabel) => {
  if (prefix && filterCriteriaLabel) {
      const patientsAgeFilterSettings = patientsAges.find(patientAge => patientAge.name === filterCriteriaLabel)
      return _.stubTrue;
  }

  return _.stubTrue;
};

const allPatientsSelector = ({ patients }, { location: { search } }) => {
  const allPatients = _.values(patients);
  const query = qs.parse(search.replace('?', ''));
  const prefix = _.flow(_.keys, _.head)(query);
  const filterCriteriaLabel = _.flow(_.values, _.head)(query);


  // const get = patientsAges.find(patientAge => patientAge.name === query.ageRange);
  // const department  = patientsDepartments.find(patientDepartment => patientDepartment.name === query.department);

  /*const patientsByAges = _.filter(
    ({ dateOfBirth }) => age.from <= getAgeYears(dateOfBirth) && getAgeYears(dateOfBirth) <= age.to)(allPatients)

    console.log(_.cond([
        []
    ])(query))*/

  console.log(prefix, filterCriteriaLabel)

  const filterPredicate = getFilterPredicate(prefix, filterCriteriaLabel);
  return _.filter(filterPredicate)(allPatients);
}
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
