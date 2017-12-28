import { combineEpics } from 'redux-observable';

import { fetchPatientVitalsDetailEpic } from './ducks/fetch-patient-vitals-detail.duck';
import { fetchPatientVitalsDetailEditEpic } from './ducks/fetch-patient-vitals-detail-edit.duck';
import { fetchPatientVitalsEpic } from './ducks/fetch-patient-vitals.duck';
import { fetchPatientVitalsUpdateEpic } from './ducks/fetch-patient-vitals.duck';
import { fetchPatientVitalsCreateEpic } from './ducks/fetch-patient-vitals-create.duck';

import patientsVitals from './ducks/fetch-patient-vitals.duck'
import patientVitalsCreate from './ducks/fetch-patient-vitals-create.duck'
import vitalsDetail from './ducks/fetch-patient-vitals-detail.duck'
import vitalsDetailEdit from './ducks/fetch-patient-vitals-detail-edit.duck'

const vitalsEpic = combineEpics(fetchPatientVitalsDetailEpic, fetchPatientVitalsDetailEditEpic, fetchPatientVitalsEpic, fetchPatientVitalsCreateEpic, fetchPatientVitalsUpdateEpic);

const vitalsReducer = {
  patientsVitals,
  patientVitalsCreate,
  vitalsDetail,
  vitalsDetailEdit,
};

export { vitalsEpic, vitalsReducer }
