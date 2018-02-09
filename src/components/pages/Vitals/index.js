import { combineEpics } from 'redux-observable';

import Vitals from './Vitals';
import { clientUrls } from '../../../config/client-urls.constants';

import { fetchPatientVitalsDetailEpic } from './ducks/fetch-patient-vitals-detail.duck';
import { fetchPatientVitalsDetailEditEpic } from './ducks/fetch-patient-vitals-detail-edit.duck';
import { fetchPatientVitalsEpic } from './ducks/fetch-patient-vitals.duck';
import { fetchPatientVitalsUpdateEpic } from './ducks/fetch-patient-vitals.duck';
import { fetchPatientVitalsCreateEpic } from './ducks/fetch-patient-vitals-create.duck';

import patientsVitals from './ducks/fetch-patient-vitals.duck'
import patientVitalsCreate from './ducks/fetch-patient-vitals-create.duck'
import vitalsDetail from './ducks/fetch-patient-vitals-detail.duck'
import vitalsDetailEdit from './ducks/fetch-patient-vitals-detail-edit.duck'

const epics = combineEpics(fetchPatientVitalsDetailEpic, fetchPatientVitalsDetailEditEpic, fetchPatientVitalsEpic, fetchPatientVitalsCreateEpic, fetchPatientVitalsUpdateEpic);

const reducers = {
  patientsVitals,
  patientVitalsCreate,
  vitalsDetail,
  vitalsDetailEdit,
};

const sidebarConfig = { key: 'vitals', pathToTransition: '/vitals', name: 'Vitals - News', isVisible: true };

const routers = [
  { key: 'vitals', component: Vitals, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.VITALS}` },
  { key: 'vitalsCreate', component: Vitals, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.VITALS}/create` },
  { key: 'vitalsDetail', component: Vitals, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.VITALS}/:sourceId` },
];

export default {
  component: Vitals,
  epics, reducers, sidebarConfig, routers,
}

