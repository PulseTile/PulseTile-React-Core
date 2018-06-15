import { combineEpics } from 'redux-observable';

import asyncComponent from '../../../components/containers/AsyncComponent/AsyncComponent';
import { clientUrls } from '../../../config/client-urls.constants';

import { fetchPatientMDTsEpic } from './ducks/fetch-patient-generic-mdt.duck';
import { fetchPatientMDTsUpdateEpic } from './ducks/fetch-patient-generic-mdt.duck';
import { fetchPatientMDTsDetailEpic } from './ducks/fetch-patient-generic-mdt-detail.duck';
import { fetchPatientMDTsDetailEditEpic } from './ducks/fetch-patient-generic-mdt-detail-edit.duck';
import { fetchPatientMDTsCreateEpic } from './ducks/fetch-patient-generic-mdt-create.duck';

import patientsMDTs from './ducks/fetch-patient-generic-mdt.duck';
import mdtsDetail from './ducks/fetch-patient-generic-mdt-detail.duck';
import mdtsDetailEdit from './ducks/fetch-patient-generic-mdt-detail-edit.duck';
import mdtsCreate from './ducks/fetch-patient-generic-mdt-create.duck';

const epics = combineEpics(fetchPatientMDTsEpic, fetchPatientMDTsDetailEpic, fetchPatientMDTsDetailEditEpic, fetchPatientMDTsCreateEpic, fetchPatientMDTsUpdateEpic);
const MDTs = asyncComponent(() => import(/* webpackChunkName: "mdt" */ './GenericMdt').then(module => module.default));

const reducers = {
  patientsMDTs,
  mdtsDetail,
  mdtsDetailEdit,
  mdtsCreate,
};

const sidebarConfig = { key: 'mdt', pathToTransition: '/mdt', name: 'Generic MDT', isVisible: true };

const routers = [
  { key: 'mdts', component: MDTs, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.MDTS}` },
  { key: 'mdtsCreate', component: MDTs, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.MDTS}/create` },
  { key: 'mdtsDetail', component: MDTs, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.MDTS}/:sourceId` },
];

export default {
  component: MDTs,
  epics, reducers, sidebarConfig, routers,
}

