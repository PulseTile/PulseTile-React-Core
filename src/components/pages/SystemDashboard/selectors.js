import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { patientsDepartments, patientsAges } from '../../../config/patients.constants';

export const patientsByDepartmentsSelector = ({ patients }) => patientsDepartments.map(department => _.filter(department.predicate)(patients));

export const patientsByAgesSelector = ({ patients }) => patientsAges.map(age => _.filter(age.predicate)(patients));

const patientsSelector = createSelector(
  patientsByDepartmentsSelector,
  patientsByAgesSelector,
  (patientsByDepartment, patientsByAge) => ({ patientsByDepartment, patientsByAge })
);

export default patientsSelector;
