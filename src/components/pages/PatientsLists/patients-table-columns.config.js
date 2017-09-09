import React from 'react';

import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';

const CalendarIcon = () => <i className="fa fa-calendar" />;

export const patientsColumnsConfig = [
  { key: 'name', title: 'Name' },
  { key: 'address', title: 'Address' },
  { key: 'dateOfBirth', title: 'Born', transformer: getDDMMMYYYY },
  { key: 'gender', title: 'Gender' },
  { key: 'id', title: 'NHS No.' },
  { key: 'ordersDate', title: 'Orders', icon: <CalendarIcon />, transformer: getDDMMMYYYY },
  { key: 'ordersCount', title: 'Orders ', icon: <span>#</span> },
  { key: 'resultsDate', title: 'Results', icon: <CalendarIcon />, transformer: getDDMMMYYYY },
  { key: 'resultsCount', title: 'Results ', icon: <span>#</span> },
  { key: 'vitalsDate', title: 'Vitals', icon: <CalendarIcon />, transformer: getDDMMMYYYY },
  { key: 'vitalsCount', title: 'Vitals ', icon: <span>#</span> },
  { key: 'diagnosesDate', title: 'Diagnoses', icon: <CalendarIcon />, transformer: getDDMMMYYYY },
  { key: 'diagnosesCount', title: 'Diagnoses ', icon: <span>#</span> },
  { key: 'viewPatientNavigation', title: '', icon: <span /> },
];

export const defaultColumnsSelected = {
  name: true,
  gender: true,
  dateOfBirth: true,
  address: true,
  id: true,
  ordersDate: true,
  resultsDate: true,
  vitalsDate: false,
  diagnosesDate: false,
  ordersCount: true,
  resultsCount: true,
  vitalsCount: false,
  diagnosesCount: false,
  viewPatientNavigation: true,
};
