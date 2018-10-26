import { combineEpics } from 'redux-observable';
import { get } from 'lodash';

import asyncComponent from '../../../components/containers/AsyncComponent/AsyncComponent';
import { clientUrls } from '../../../config/client-urls.constants';
import { fetchPatientMedicationsDetailEpic } from './ducks/fetch-patient-medications-detail.duck';
import { fetchPatientMedicationsDetailEditEpic } from './ducks/fetch-patient-medications-detail-edit.duck';
import { fetchPatientMedicationsEpic, fetchPatientMedicationsSynopsisEpic } from './ducks/fetch-patient-medications.duck';
import { fetchPatientMedicationsUpdateEpic } from './ducks/fetch-patient-medications.duck';
import { fetchPatientMedicationsCreateEpic } from './ducks/fetch-patient-medications-create.duck';
import patientsMedications from './ducks/fetch-patient-medications.duck';
import patientMedicationsCreate from './ducks/fetch-patient-medications-create.duck';
import medicationsDetail from './ducks/fetch-patient-medications-detail.duck';
import medicationsDetailEdit from './ducks/fetch-patient-medications-detail-edit.duck';

import { themeConfigs } from '../../../themes.config';
import { isPluginVisible } from '../../../utils/themeSettings-helper';

const hiddenCorePlugins = get(themeConfigs, 'corePluginsToHide', []);

const epics = combineEpics(fetchPatientMedicationsDetailEpic, fetchPatientMedicationsDetailEditEpic, fetchPatientMedicationsEpic, fetchPatientMedicationsSynopsisEpic, fetchPatientMedicationsCreateEpic, fetchPatientMedicationsUpdateEpic);
const Medications = asyncComponent(() => import(/* webpackChunkName: "medications" */ './Medications').then(module => module.default));

const reducers = {
  patientsMedications,
  patientMedicationsCreate,
  medicationsDetail,
  medicationsDetailEdit,
};

let sidebarConfig = {};
let routers = [];
if (isPluginVisible(hiddenCorePlugins, 'medications')) {
  sidebarConfig = { key: 'medications', pathToTransition: '/medications', name: 'Medications', isVisible: true };
  routers = [
    { key: 'medications', component: Medications, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.MEDICATIONS}` },
    { key: 'medicationsCreate', component: Medications, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.MEDICATIONS}/create` },
    { key: 'medicationsDetail', component: Medications, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.MEDICATIONS}/:sourceId` },
  ];
}

export default {
  component: Medications,
  epics, reducers, sidebarConfig, routers,
}
