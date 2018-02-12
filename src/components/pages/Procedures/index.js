import { combineEpics } from 'redux-observable';

import Procedures from './Procedures';
import { clientUrls } from '../../../config/client-urls.constants';

import { fetchPatientProceduresDetailEpic } from './ducks/fetch-patient-procedures-detail.duck';
import { fetchPatientProceduresDetailEditEpic } from './ducks/fetch-patient-procedures-detail-edit.duck';
import { fetchPatientProceduresEpic } from './ducks/fetch-patient-procedures.duck';
import { fetchPatientProceduresUpdateEpic } from './ducks/fetch-patient-procedures.duck';
import { fetchPatientProceduresCreateEpic } from './ducks/fetch-patient-procedures-create.duck';

import patientsProcedures from './ducks/fetch-patient-procedures.duck';
import patientProceduresCreate from './ducks/fetch-patient-procedures-create.duck';
import proceduresDetail from './ducks/fetch-patient-procedures-detail.duck';
import proceduresDetailEdit from './ducks/fetch-patient-procedures-detail-edit.duck';

const epics = combineEpics(fetchPatientProceduresDetailEpic, fetchPatientProceduresDetailEditEpic, fetchPatientProceduresEpic, fetchPatientProceduresCreateEpic, fetchPatientProceduresUpdateEpic);

const reducers = {
  patientsProcedures,
  patientProceduresCreate,
  proceduresDetail,
  proceduresDetailEdit,
};

const sidebarConfig = { key: 'procedures', pathToTransition: '/procedures', name: 'Procedures', isVisible: true };

const routers = [
  { key: 'procedures', component: Procedures, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.PROCEDURES}` },
  { key: 'proceduresCreate', component: Procedures, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.PROCEDURES}/create` },
  { key: 'proceduresDetail', component: Procedures, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.PROCEDURES}/:sourceId` },
];

export default {
  component: Procedures,
  epics, reducers, sidebarConfig, routers,
}

