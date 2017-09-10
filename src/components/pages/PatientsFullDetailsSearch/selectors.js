import _ from 'lodash/fp';
import qs from 'qs';
import { createSelector } from 'reselect';

import { patientsDepartments, patientsAgeRanges, AGE_RANGE_PREFIX, DEPARTMENT_PREFIX } from '../../../config/patients.constants';

const getFilterObj = (search) => {
    const query = qs.parse(search.replace('?', ''));
    const prefix = _.flow(_.keys, _.head)(query);
    const filterCriteriaLabel = _.flow(_.values, _.head)(query);

    if (prefix && filterCriteriaLabel) {
        switch (prefix) {
            case AGE_RANGE_PREFIX:
                return _.find(ageRange => ageRange.name === filterCriteriaLabel)(patientsAgeRanges)
            case DEPARTMENT_PREFIX:
                return _.find(department => department.name === filterCriteriaLabel)(patientsDepartments)
            default:
                return null;
        }
    }
    return null
};

const getFilterPredicate = _.flow(getFilterObj, _.getOr(_.stubTrue, 'predicate'));

const allPatientsSelector = ({ patients }, { location: { search } }) => {
    const allPatients = _.values(patients);

    const filterPredicate = getFilterPredicate(search);
    return _.filter(filterPredicate)(allPatients);
};

const patientsCountsSelector = ({ patientsCounts }) => patientsCounts;

const panelTitleSelector = (state, { location: { search } }) => {
    const filterObj = getFilterObj(search);
    const name = _.get('name')(filterObj);
    const prefixLabel = _.get('prefixLabel')(filterObj);

    if (name && prefixLabel) return `Patient Info. ${prefixLabel}: ${name}`;
    return 'Patient Info'
};

const patientsSelector = createSelector(
    allPatientsSelector,
    patientsCountsSelector,
    panelTitleSelector,
    (allPatients, patientsCounts, panelTitle) => {
        const getPatientCounts = id =>_.getOr({}, [id, 0], patientsCounts); //TODO maybe patient counts can be not only [{}] but [{}, ..., {}]
        const allPatientsWithCounts = _.map(({ id, ...restPatient }) => ({ id, ...restPatient, ...getPatientCounts(id) }), allPatients);
        return ({ allPatients, patientsCounts, allPatientsWithCounts, panelTitle });
    }
);

export default patientsSelector;
