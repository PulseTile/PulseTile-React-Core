import { combineEpics } from 'redux-observable';

import { fetchPatientClinicalNotesEpic } from './ducks/fetch-patient-clinical-notes.duck';
import { fetchPatientDiagnosesDetailEpic } from './ducks/fetch-patient-clinical-notes-detail.duck';
import { fetchPatientDiagnosesDetailEditEpic } from './ducks/fetch-patient-clinical-notes-detail-edit.duck';

import patientsClinicalNotes from './ducks/fetch-patient-clinical-notes.duck'
import clinicalNotesDetail from './ducks/fetch-patient-clinical-notes-detail.duck'
import clinicalNotesDetailEdit from './ducks/fetch-patient-clinical-notes-detail-edit.duck'

const clinicalNotesEpic = combineEpics(fetchPatientClinicalNotesEpic, fetchPatientDiagnosesDetailEpic, fetchPatientDiagnosesDetailEditEpic);

const clinicalNotesReducer = {
  patientsClinicalNotes,
  clinicalNotesDetail,
  clinicalNotesDetailEdit,
};

export { clinicalNotesEpic, clinicalNotesReducer }
