import { combineEpics } from 'redux-observable';

import Documents from './Documents';
import { clientUrls } from '../../../config/client-urls.constants';

import { fetchPatientDocumentsDetailEpic } from './ducks/fetch-patient-documents-detail.duck';
import { fetchPatientDocumentsEpic } from './ducks/fetch-patient-documents.duck';

import patientsDocuments from './ducks/fetch-patient-documents.duck';
import  documentsDetail from './ducks/fetch-patient-documents-detail.duck';

const  epics = combineEpics(fetchPatientDocumentsDetailEpic, fetchPatientDocumentsEpic);

const  reducers = {
  patientsDocuments,
  documentsDetail
};

const sidebarConfig = { key: 'documents', pathToTransition: '/documents', name: 'Documents', isVisible: true };

const routers = [
  { key: 'documents', component: Documents, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.DOCUMENTS}` },
  { key: 'documentsDetail', component: Documents, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.DOCUMENTS}/:sourceId` },
];

export default {
  component: Documents,
  epics, reducers, sidebarConfig, routers,
}
