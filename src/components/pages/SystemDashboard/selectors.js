import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { patientsDepartments, patientsAges } from '../../../config/patients.constants';
import { getAgeYears } from '../../../utils/time-helpers.utils';

const patientsByDepartmentsSelector = ({ patients }) => patientsDepartments.map(department => _.filter(patient => patient.department === department, patients));

const patientsByAgesSelector = ({ patients }) => patientsAges
  .map(({ from, to }) => _.filter(
    ({ dateOfBirth }) => from <= getAgeYears(dateOfBirth) && getAgeYears(dateOfBirth) <= to, patients))

const patientsSelector = createSelector(
  patientsByDepartmentsSelector,
  patientsByAgesSelector,
  (patientsByDepartment, patientsByAge) => ({ patientsByDepartment, patientsByAge })
);

export default patientsSelector;
