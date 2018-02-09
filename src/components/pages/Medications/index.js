import { combineEpics } from 'redux-observable';

import Medications from "./Medications";
import {clientUrls} from "../../../config/client-urls.constants";

import { fetchPatientMedicationsDetailEpic } from './ducks/fetch-patient-medications-detail.duck';
import { fetchPatientMedicationsDetailEditEpic } from './ducks/fetch-patient-medications-detail-edit.duck';
import { fetchPatientMedicationsEpic } from './ducks/fetch-patient-medications.duck';
import { fetchPatientMedicationsUpdateEpic } from './ducks/fetch-patient-medications.duck';
import { fetchPatientMedicationsCreateEpic } from './ducks/fetch-patient-medications-create.duck';

import patientsMedications from './ducks/fetch-patient-medications.duck'
import patientMedicationsCreate from './ducks/fetch-patient-medications-create.duck'
import medicationsDetail from './ducks/fetch-patient-medications-detail.duck'
import medicationsDetailEdit from './ducks/fetch-patient-medications-detail-edit.duck'

const epics = combineEpics(fetchPatientMedicationsDetailEpic, fetchPatientMedicationsDetailEditEpic, fetchPatientMedicationsEpic, fetchPatientMedicationsCreateEpic, fetchPatientMedicationsUpdateEpic);

const reducers = {
  patientsMedications,
  patientMedicationsCreate,
  medicationsDetail,
  medicationsDetailEdit,
};

const sidebarConfig = { key: 'medications', pathToTransition: '/medications', name: 'Medications', isVisible: true };

const routers = [
  { key: 'medications', component: Medications, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.MEDICATIONS}` },
  { key: 'medicationsCreate', component: Medications, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.MEDICATIONS}/create` },
  { key: 'medicationsDetail', component: Medications, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.MEDICATIONS}/:sourceId` },
];

export default {
  component: Medications,
  epics, reducers, sidebarConfig, routers,
}
