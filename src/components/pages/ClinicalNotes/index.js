import { combineEpics } from 'redux-observable';

import { fetchPatientClinicalNotesEpic } from './ducks/fetch-patient-clinical-notes.duck';
import { fetchPatientClinicalNotesDetailEpic } from './ducks/fetch-patient-clinical-notes-detail.duck';
import { fetchPatientClinicalNotesDetailEditEpic } from './ducks/fetch-patient-clinical-notes-detail-edit.duck';
import { fetchPatientClinicalNotesCreateEpic } from './ducks/fetch-patient-clinical-notes-create.duck';

import patientsClinicalNotes from './ducks/fetch-patient-clinical-notes.duck'
import clinicalNotesDetail from './ducks/fetch-patient-clinical-notes-detail.duck'
import clinicalNotesDetailEdit from './ducks/fetch-patient-clinical-notes-detail-edit.duck'
import clinicalNotesCreate from './ducks/fetch-patient-clinical-notes-create.duck'

const clinicalNotesEpic = combineEpics(fetchPatientClinicalNotesEpic, fetchPatientClinicalNotesDetailEpic, fetchPatientClinicalNotesDetailEditEpic, fetchPatientClinicalNotesCreateEpic);

const clinicalNotesReducer = {
  patientsClinicalNotes,
  clinicalNotesDetail,
  clinicalNotesDetailEdit,
  clinicalNotesCreate,
};

export { clinicalNotesEpic, clinicalNotesReducer }
