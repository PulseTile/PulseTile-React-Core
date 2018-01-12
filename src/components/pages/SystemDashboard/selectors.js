import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { patientsDepartments, patientsAgeRanges } from '../../../config/patients.constants';

export const patientsByDepartmentsSelector = ({ patients }) => patientsDepartments.map(department => _.filter(department.predicate)(patients));

export const patientsByAgesSelector = ({ patients }) => patientsAgeRanges.map(ageRange => _.filter(ageRange.predicate)(patients));

const patientsSelector = createSelector(
  patientsByDepartmentsSelector,
  patientsByAgesSelector,
  (patientsByDepartment, patientsByAge) => ({ patientsByDepartment, patientsByAge })
);

export default patientsSelector;
