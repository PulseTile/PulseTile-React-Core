import { combineEpics } from 'redux-observable';

import asyncComponent from '../../../components/containers/AsyncComponent/AsyncComponent';
import { clientUrls } from '../../../config/client-urls.constants';

import { fetchPatientGenericPluginEpic } from './ducks/fetch-patient-generic-plugin.duck';
import { fetchPatientGenericPluginUpdateEpic } from './ducks/fetch-patient-generic-plugin.duck';
import { fetchPatientGenericPluginDetailEpic } from './ducks/fetch-patient-generic-plugin-detail.duck';
import { fetchPatientGenericPluginDetailEditEpic } from './ducks/fetch-patient-generic-plugin-detail-edit.duck';
import { fetchPatientGenericPluginCreateEpic } from './ducks/fetch-patient-generic-plugin-create.duck';

import patientsGenericPlugin from './ducks/fetch-patient-generic-plugin.duck';
import genericPluginDetail from './ducks/fetch-patient-generic-plugin-detail.duck';
import genericPluginDetailEdit from './ducks/fetch-patient-generic-plugin-detail-edit.duck';
import genericPluginCreate from './ducks/fetch-patient-generic-plugin-create.duck';

const epics = combineEpics(fetchPatientGenericPluginEpic, fetchPatientGenericPluginDetailEpic, fetchPatientGenericPluginDetailEditEpic, fetchPatientGenericPluginCreateEpic, fetchPatientGenericPluginUpdateEpic);
const GenericPlugin = asyncComponent(() => import(/* webpackChunkName: "generic" */ './GenericPlugin').then(module => module.default));

const reducers = {
  patientsGenericPlugin,
  genericPluginDetail,
  genericPluginDetailEdit,
  genericPluginCreate,
};

const sidebarConfig = { key: 'genericPlugin', pathToTransition: '/genericPlugin', name: 'Generic Plugin', isVisible: false };

const routers = [
  { key: 'genericPlugin', component: GenericPlugin, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.GENERIC_PLUGIN}` },
  { key: 'genericPluginCreate', component: GenericPlugin, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.GENERIC_PLUGIN}/create` },
  { key: 'genericPluginDetail', component: GenericPlugin, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.GENERIC_PLUGIN}/:sourceId` },
];

export default {
  component: GenericPlugin,
  epics, reducers, sidebarConfig, routers,
}

