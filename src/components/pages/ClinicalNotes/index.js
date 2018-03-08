import { combineEpics } from 'redux-observable';

import asyncComponent from '../../../components/containers/AsyncComponent/AsyncComponent';
import { clientUrls } from '../../../config/client-urls.constants';

import { fetchPatientClinicalNotesEpic } from './ducks/fetch-patient-clinical-notes.duck';
import { fetchPatientClinicalNotesUpdateEpic } from './ducks/fetch-patient-clinical-notes.duck';
import { fetchPatientClinicalNotesDetailEpic } from './ducks/fetch-patient-clinical-notes-detail.duck';
import { fetchPatientClinicalNotesDetailEditEpic } from './ducks/fetch-patient-clinical-notes-detail-edit.duck';
import { fetchPatientClinicalNotesCreateEpic } from './ducks/fetch-patient-clinical-notes-create.duck';

import patientsClinicalNotes from './ducks/fetch-patient-clinical-notes.duck';
import clinicalNotesDetail from './ducks/fetch-patient-clinical-notes-detail.duck';
import clinicalNotesDetailEdit from './ducks/fetch-patient-clinical-notes-detail-edit.duck';
import clinicalNotesCreate from './ducks/fetch-patient-clinical-notes-create.duck';

const epics = combineEpics(fetchPatientClinicalNotesEpic, fetchPatientClinicalNotesDetailEpic, fetchPatientClinicalNotesDetailEditEpic, fetchPatientClinicalNotesCreateEpic, fetchPatientClinicalNotesUpdateEpic);
const ClinicalNotes = asyncComponent(() => import(/* webpackChunkName: "clinicalNotes" */ './ClinicalNotes').then(module => module.default));

const reducers = {
  patientsClinicalNotes,
  clinicalNotesDetail,
  clinicalNotesDetailEdit,
  clinicalNotesCreate,
};

const sidebarConfig = { key: 'clinicalNotes', pathToTransition: '/clinicalNotes', name: 'Clinical Notes', isVisible: true };

const routers = [
  { key: 'clinicalNotes', component: ClinicalNotes, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.CLINICAL_NOTES}` },
  { key: 'clinicalNotesCreate', component: ClinicalNotes, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.CLINICAL_NOTES}/create` },
  { key: 'clinicalNotesDetail', component: ClinicalNotes, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.CLINICAL_NOTES}/:sourceId` },
];

export default {
  component: ClinicalNotes,
  epics, reducers, sidebarConfig, routers,
}

