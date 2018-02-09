import { combineEpics } from 'redux-observable';

import MDTs from './MDTs';
import { clientUrls } from '../../../config/client-urls.constants';

import { fetchPatientMDTsEpic } from './ducks/fetch-patient-mdts.duck';
import { fetchPatientMDTsUpdateEpic } from './ducks/fetch-patient-mdts.duck';
import { fetchPatientMDTsDetailEpic } from './ducks/fetch-patient-mdts-detail.duck';
import { fetchPatientMDTsDetailEditEpic } from './ducks/fetch-patient-mdts-detail-edit.duck';
import { fetchPatientMDTsCreateEpic } from './ducks/fetch-patient-mdts-create.duck';
;
import patientsMDTs from './ducks/fetch-patient-mdts.duck';
import mdtsDetail from './ducks/fetch-patient-mdts-detail.duck';
import mdtsDetailEdit from './ducks/fetch-patient-mdts-detail-edit.duck';
import mdtsCreate from './ducks/fetch-patient-mdts-create.duck';

const epics = combineEpics(fetchPatientMDTsEpic, fetchPatientMDTsDetailEpic, fetchPatientMDTsDetailEditEpic, fetchPatientMDTsCreateEpic, fetchPatientMDTsUpdateEpic);

const reducers = {
  patientsMDTs,
  mdtsDetail,
  mdtsDetailEdit,
  mdtsCreate,
};

const sidebarConfig = { key: 'mdt', pathToTransition: '/mdt', name: 'MDT', isVisible: true };

const routers = [
  { key: 'mdts', component: MDTs, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.MDTS}` },
  { key: 'mdtsCreate', component: MDTs, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.MDTS}/create` },
  { key: 'mdtsDetail', component: MDTs, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.MDTS}/:sourceId` },
];

export default {
  component: MDTs,
  epics, reducers, sidebarConfig, routers,
}

