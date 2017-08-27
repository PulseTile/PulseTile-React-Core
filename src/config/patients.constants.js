import { getAgeYears } from '../utils/time-helpers.utils';

export const patientsDepartmentPredicate = departmentName => patient => patient.department === departmentName;

export const patientsAgesPredicate = (from, to) => patient => from <= getAgeYears(patient.dateOfBirth) && getAgeYears(patient.dateOfBirth) <= to;

export const patientsDepartments = [
  { name: 'Community Care', prefix: 'department', prefixLabel: 'Setting', predicate: patientsDepartmentPredicate('Community Care') },
  { name: 'Hospital', prefix: 'department', prefixLabel: 'Setting', predicate: patientsDepartmentPredicate('Hospital') },
  { name: 'Mental Health', prefix: 'department', prefixLabel: 'Setting', predicate: patientsDepartmentPredicate('Mental Health') },
  { name: 'Neighbourhood', prefix: 'department', prefixLabel: 'Setting', predicate: patientsDepartmentPredicate('Neighbourhood') },
  { name: 'Primary Care', prefix: 'department', prefixLabel: 'Setting', predicate: patientsDepartmentPredicate('Primary Care') },
];

export const patientsAges = [
  { name: '19-30', from: 19, to: 30, prefix: 'ageRange', prefixLabel: 'Age range:', predicate: patientsAgesPredicate(19, 30) },
  { name: '31-60', from: 31, to: 60, prefix: 'ageRange', prefixLabel: 'Age range:', predicate: patientsAgesPredicate(31, 60) },
  { name: '61-80', from: 61, to: 80, prefix: 'ageRange', prefixLabel: 'Age range:', predicate: patientsAgesPredicate(61, 80) },
  { name: '>80', from: 81, to: 999, prefix: 'ageRange', prefixLabel: 'Age range:', predicate: patientsAgesPredicate(81, 999) },
];
