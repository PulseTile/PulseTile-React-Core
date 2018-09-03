import { combineEpics } from 'redux-observable';
import { get } from 'lodash';

import asyncComponent from '../../../components/containers/AsyncComponent/AsyncComponent';
import { clientUrls } from '../../../config/client-urls.constants';
import { fetchPatientAllergiesDetailEpic } from './ducks/fetch-patient-allergies-detail.duck';
import { fetchPatientAllergiesDetailEditEpic } from './ducks/fetch-patient-allergies-detail-edit.duck';
import { fetchPatientAllergiesEpic, fetchPatientAllergiesSynopsisEpic } from './ducks/fetch-patient-allergies.duck';
import { fetchPatientAllergiesUpdateEpic } from './ducks/fetch-patient-allergies.duck';
import { fetchPatientAllergiesCreateEpic } from './ducks/fetch-patient-allergies-create.duck';

import patientsAllergies from './ducks/fetch-patient-allergies.duck';
import patientAllergiesCreate from './ducks/fetch-patient-allergies-create.duck';
import allergiesDetail from './ducks/fetch-patient-allergies-detail.duck';
import allergiesDetailEdit from './ducks/fetch-patient-allergies-detail-edit.duck';

import { themeConfigs } from '../../../themes.config';
import { isPluginVisible } from '../../../utils/themeSettings-helper';

const hiddenCorePlugins = get(themeConfigs, 'corePluginsToHide', []);

const epics = combineEpics(fetchPatientAllergiesDetailEpic, fetchPatientAllergiesDetailEditEpic, fetchPatientAllergiesEpic, fetchPatientAllergiesSynopsisEpic, fetchPatientAllergiesCreateEpic, fetchPatientAllergiesUpdateEpic);
const Allergies = asyncComponent(() => import(/* webpackChunkName: "allergies" */ './Allergies').then(module => module.default));

const reducers = {
  patientsAllergies,
  patientAllergiesCreate,
  allergiesDetail,
  allergiesDetailEdit,
};

let sidebarConfig = {};
let routers = [];
if (isPluginVisible(hiddenCorePlugins, 'allergies')) {
  sidebarConfig = { key: 'allergies', pathToTransition: '/allergies', name: 'Allergies', isVisible: true };
  routers = [
    { key: 'allergies', component: Allergies, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.ALLERGIES}` },
    { key: 'allergiesCreate', component: Allergies, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.ALLERGIES}/create` },
    { key: 'allergiesDetail', component: Allergies, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.ALLERGIES}/:sourceId` },
  ];
}

export default {
  component: Allergies,
  epics, reducers, sidebarConfig, routers,
}
