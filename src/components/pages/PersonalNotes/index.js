import { combineEpics } from 'redux-observable';

import { fetchPatientPersonalNotesEpic } from './ducks/fetch-patient-personal-notes.duck';
import { fetchPatientPersonalNotesUpdateEpic } from './ducks/fetch-patient-personal-notes.duck';
import { fetchPatientPersonalNotesDetailEpic } from './ducks/fetch-patient-personal-notes-detail.duck';
import { fetchPatientPersonalNotesDetailEditEpic } from './ducks/fetch-patient-personal-notes-detail-edit.duck';
import { fetchPatientPersonalNotesCreateEpic } from './ducks/fetch-patient-personal-notes-create.duck';

import patientsPersonalNotes from './ducks/fetch-patient-personal-notes.duck'
import personalNotesDetail from './ducks/fetch-patient-personal-notes-detail.duck'
import personalNotesDetailEdit from './ducks/fetch-patient-personal-notes-detail-edit.duck'
import personalNotesCreate from './ducks/fetch-patient-personal-notes-create.duck'

const personalNotesEpic = combineEpics(fetchPatientPersonalNotesEpic, fetchPatientPersonalNotesDetailEpic, fetchPatientPersonalNotesDetailEditEpic, fetchPatientPersonalNotesCreateEpic, fetchPatientPersonalNotesUpdateEpic);

const personalNotesReducer = {
  patientsPersonalNotes,
  personalNotesDetail,
  personalNotesDetailEdit,
  personalNotesCreate,
};

export { personalNotesEpic, personalNotesReducer }
