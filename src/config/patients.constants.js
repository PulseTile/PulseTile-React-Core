import { getAgeYears } from '../utils/time-helpers.utils';

export const AGE_RANGE_PREFIX = 'ageRange';
export const DEPARTMENT_PREFIX = 'department';

export const patientsDepartmentPredicate = departmentName => patient => patient.department === departmentName;

export const patientsAgeRangesPredicate = (from, to) => patient => from <= getAgeYears(patient.dateOfBirth) && getAgeYears(patient.dateOfBirth) <= to;

export const patientsDepartments = [
  { name: 'Community Care', prefix: DEPARTMENT_PREFIX, prefixLabel: 'Setting', predicate: patientsDepartmentPredicate('Community Care') },
  { name: 'Hospital', prefix: DEPARTMENT_PREFIX, prefixLabel: 'Setting', predicate: patientsDepartmentPredicate('Hospital') },
  { name: 'Mental Health', prefix: DEPARTMENT_PREFIX, prefixLabel: 'Setting', predicate: patientsDepartmentPredicate('Mental Health') },
  { name: 'Neighbourhood', prefix: DEPARTMENT_PREFIX, prefixLabel: 'Setting', predicate: patientsDepartmentPredicate('Neighbourhood') },
  { name: 'Primary Care', prefix: DEPARTMENT_PREFIX, prefixLabel: 'Setting', predicate: patientsDepartmentPredicate('Primary Care') },
];

export const patientsAgeRanges = [
  { name: '19-30', from: 19, to: 30, prefix: AGE_RANGE_PREFIX, prefixLabel: 'Age range', predicate: patientsAgeRangesPredicate(19, 30) },
  { name: '31-60', from: 31, to: 60, prefix: AGE_RANGE_PREFIX, prefixLabel: 'Age range', predicate: patientsAgeRangesPredicate(31, 60) },
  { name: '61-80', from: 61, to: 80, prefix: AGE_RANGE_PREFIX, prefixLabel: 'Age range', predicate: patientsAgeRangesPredicate(61, 80) },
  { name: '>80', from: 81, to: 999, prefix: AGE_RANGE_PREFIX, prefixLabel: 'Age range', predicate: patientsAgeRangesPredicate(81, 999) },
];
