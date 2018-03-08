import { combineEpics } from 'redux-observable';

import asyncComponent from '../../../components/containers/AsyncComponent/AsyncComponent';
import { clientUrls } from '../../../config/client-urls.constants';

import { fetchPatientPersonalNotesEpic } from './ducks/fetch-patient-personal-notes.duck';
import { fetchPatientPersonalNotesUpdateEpic } from './ducks/fetch-patient-personal-notes.duck';
import { fetchPatientPersonalNotesDetailEpic } from './ducks/fetch-patient-personal-notes-detail.duck';
import { fetchPatientPersonalNotesDetailEditEpic } from './ducks/fetch-patient-personal-notes-detail-edit.duck';
import { fetchPatientPersonalNotesCreateEpic } from './ducks/fetch-patient-personal-notes-create.duck';

import patientsPersonalNotes from './ducks/fetch-patient-personal-notes.duck';
import personalNotesDetail from './ducks/fetch-patient-personal-notes-detail.duck';
import personalNotesDetailEdit from './ducks/fetch-patient-personal-notes-detail-edit.duck';
import personalNotesCreate from './ducks/fetch-patient-personal-notes-create.duck';

const epics = combineEpics(fetchPatientPersonalNotesEpic, fetchPatientPersonalNotesDetailEpic, fetchPatientPersonalNotesDetailEditEpic, fetchPatientPersonalNotesCreateEpic, fetchPatientPersonalNotesUpdateEpic);
const PersonalNotes = asyncComponent(() => import(/* webpackChunkName: "personalNotes" */ './PersonalNotes').then(module => module.default));

const reducers = {
  patientsPersonalNotes,
  personalNotesDetail,
  personalNotesDetailEdit,
  personalNotesCreate,
};

const sidebarConfig = { key: 'personalNotes', pathToTransition: '/personalNotes', name: 'Personal Notes', isVisible: true };

const routers = [
  { key: 'personalNotes', component: PersonalNotes, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.PERSONAL_NOTES}` },
  { key: 'personalNotesCreate', component: PersonalNotes, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.PERSONAL_NOTES}/create` },
  { key: 'personalNotesDetail', component: PersonalNotes, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.PERSONAL_NOTES}/:sourceId` },
];

export default {
  component: PersonalNotes,
  epics, reducers, sidebarConfig, routers,
}

