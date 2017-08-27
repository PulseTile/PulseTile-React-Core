import _ from 'lodash/fp';
import qs from 'qs';
import { createSelector } from 'reselect';

import { patientsDepartments, patientsAgeRanges, AGE_RANGE_PREFIX, DEPARTMENT_PREFIX } from '../../../config/patients.constants';

const getFilterPredicate = (prefix, filterCriteriaLabel) => {
  if (prefix && filterCriteriaLabel) {
    switch (prefix) {
      case AGE_RANGE_PREFIX:
        return _.flow(_.find(ageRange => ageRange.name === filterCriteriaLabel), _.getOr(_.stubTrue, 'predicate'))(patientsAgeRanges)
      case DEPARTMENT_PREFIX:
        return _.flow(_.find(department => department.name === filterCriteriaLabel), _.getOr(_.stubTrue, 'predicate'))(patientsDepartments)
      default:
        return _.stubTrue;
    }
  }

  return _.stubTrue;
};

const allPatientsSelector = ({ patients }, { location: { search } }) => {
  const allPatients = _.values(patients);
  const query = qs.parse(search.replace('?', ''));
  const prefix = _.flow(_.keys, _.head)(query);
  const filterCriteriaLabel = _.flow(_.values, _.head)(query);

  const filterPredicate = getFilterPredicate(prefix, filterCriteriaLabel);
  return _.filter(filterPredicate)(allPatients);
};

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
