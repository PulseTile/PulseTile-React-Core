import { combineEpics } from 'redux-observable';

import asyncComponent from '../../../components/containers/AsyncComponent/AsyncComponent';
import { clientUrls } from '../../../config/client-urls.constants';

import { fetchPatientDiaryEntryEpic } from './ducks/fetch-patient-diary-entry.duck';
import { fetchPatientDiaryEntryUpdateEpic } from './ducks/fetch-patient-diary-entry.duck';
import { fetchPatientDiaryEntryDetailEpic } from './ducks/fetch-patient-diary-entry-detail.duck';
import { fetchPatientDiaryEntryDetailEditEpic } from './ducks/fetch-patient-diary-entry-detail-edit.duck';
import { fetchPatientDiaryEntryCreateEpic } from './ducks/fetch-patient-diary-entry-create.duck';

import patientsDiaryEntry from './ducks/fetch-patient-diary-entry.duck';
import diaryEntryDetail from './ducks/fetch-patient-diary-entry-detail.duck';
import diaryEntryDetailEdit from './ducks/fetch-patient-diary-entry-detail-edit.duck';
import diaryEntryCreate from './ducks/fetch-patient-diary-entry-create.duck';

const epics = combineEpics(fetchPatientDiaryEntryEpic, fetchPatientDiaryEntryDetailEpic, fetchPatientDiaryEntryDetailEditEpic, fetchPatientDiaryEntryCreateEpic, fetchPatientDiaryEntryUpdateEpic);
const DiaryEntry = asyncComponent(() => import('./DiaryEntry').then(module => module.default));

const reducers = {
  patientsDiaryEntry,
  diaryEntryDetail,
  diaryEntryDetailEdit,
  diaryEntryCreate,
};

const sidebarConfig = { key: 'diaryEntry', pathToTransition: '/diaryEntry', name: 'Diary Entry', isVisible: false };

const routers = [
  { key: 'diaryEntry', component: DiaryEntry, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.DIARY_ENTRY}` },
  { key: 'diaryEntryCreate', component: DiaryEntry, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.DIARY_ENTRY}/create` },
  { key: 'diaryEntryDetail', component: DiaryEntry, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.DIARY_ENTRY}/:sourceId` },
];

export default {
  component: DiaryEntry,
  epics, reducers, sidebarConfig, routers,
}
