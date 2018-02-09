import { combineEpics } from 'redux-observable';

import Allergies from './Allergies';
import {clientUrls} from '../../../config/client-urls.constants';

import { fetchPatientAllergiesDetailEpic } from './ducks/fetch-patient-allergies-detail.duck';
import { fetchPatientAllergiesDetailEditEpic } from './ducks/fetch-patient-allergies-detail-edit.duck';
import { fetchPatientAllergiesEpic } from './ducks/fetch-patient-allergies.duck';
import { fetchPatientAllergiesUpdateEpic } from './ducks/fetch-patient-allergies.duck';
import { fetchPatientAllergiesCreateEpic } from './ducks/fetch-patient-allergies-create.duck';

import patientsAllergies from './ducks/fetch-patient-allergies.duck';
import patientAllergiesCreate from './ducks/fetch-patient-allergies-create.duck';
import allergiesDetail from './ducks/fetch-patient-allergies-detail.duck';
import allergiesDetailEdit from './ducks/fetch-patient-allergies-detail-edit.duck';

const epics = combineEpics(fetchPatientAllergiesDetailEpic, fetchPatientAllergiesDetailEditEpic, fetchPatientAllergiesEpic, fetchPatientAllergiesCreateEpic, fetchPatientAllergiesUpdateEpic);

const reducers = {
  patientsAllergies,
  patientAllergiesCreate,
  allergiesDetail,
  allergiesDetailEdit,
};

const sidebarConfig = { key: 'allergies', pathToTransition: '/allergies', name: 'Allergies', isVisible: true };

const routers = [
  { key: 'allergies', component: Allergies, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.ALLERGIES}` },
  { key: 'allergiesCreate', component: Allergies, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.ALLERGIES}/create` },
  { key: 'allergiesDetail', component: Allergies, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.ALLERGIES}/:sourceId` },
];

export default {
  component: Allergies,
  epics, reducers, sidebarConfig, routers,
}
