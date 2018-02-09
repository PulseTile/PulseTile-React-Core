import { combineEpics } from 'redux-observable';

import Drawings from './Drawings';
import { clientUrls } from '../../../config/client-urls.constants';

import { fetchPatientDrawingsDetailEpic } from './ducks/fetch-patient-drawings-detail.duck';
import { fetchPatientDrawingsDetailEditEpic } from './ducks/fetch-patient-drawings-detail-edit.duck';
import { fetchPatientDrawingsEpic } from './ducks/fetch-patient-drawings.duck';
import { fetchPatientDrawingsUpdateEpic } from './ducks/fetch-patient-drawings.duck';
import { fetchPatientDrawingsCreateEpic } from './ducks/fetch-patient-drawings-create.duck';

import patientsDrawings from './ducks/fetch-patient-drawings.duck'
import patientDrawingsCreate from './ducks/fetch-patient-drawings-create.duck'
import drawingsDetail from './ducks/fetch-patient-drawings-detail.duck'
import drawingsDetailEdit from './ducks/fetch-patient-drawings-detail-edit.duck'

const epics = combineEpics(fetchPatientDrawingsDetailEpic, fetchPatientDrawingsDetailEditEpic, fetchPatientDrawingsEpic, fetchPatientDrawingsCreateEpic, fetchPatientDrawingsUpdateEpic);

const reducers = {
  patientsDrawings,
  patientDrawingsCreate,
  drawingsDetail,
  drawingsDetailEdit,
};

const sidebarConfig = { key: 'drawings', pathToTransition: '/drawings', name: 'Drawings', isVisible: true };

const routers = [
  { key: 'drawings', component: Drawings, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.DRAWINGS}` },
  { key: 'drawingsCreate', component: Drawings, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.DRAWINGS}/create` },
  { key: 'drawingsDetail', component: Drawings, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.DRAWINGS}/:sourceId` },
];

export default {
  component: Drawings,
  epics, reducers, sidebarConfig, routers,
}

